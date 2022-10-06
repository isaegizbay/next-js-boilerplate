import { inject, injectable } from 'inversify';
import { TYPES } from "@app/container/constants/TYPES";
import type { IUser } from "@app/shared/User/types/IUser";
import type { IAuthApi } from "@app/modules/auth/types/IAuthApi";
import type { LoginPayload } from "@app/modules/auth/types/LoginPayload";
import type { AuthDto } from "@app/shared/User/types/AuthDto";
import { UserAuthFactory } from "@app/shared/User/classes/UserFactory";
import { LocalStorageHelper } from "@app/utils/classses/LocalStorageHelper";
import { IApiResponseCallbacks } from "@app/shared/Http/types/IApiResponseCallbacks";
import { handleHttpError } from "@app/shared/Http/functions/handleHttpError";

@injectable()
export class AuthService {
	private userInstance?: IUser;

	constructor(@inject(TYPES.AuthApi) private authApi: IAuthApi) {
		this.authApi = authApi;
	}

	async login(payload: LoginPayload, callbacks: IApiResponseCallbacks<string>) {
		try {
			const response = await this.authApi.login(payload);
			callbacks.handleSuccess(response);
		} catch (e) {
			handleHttpError(e, callbacks);
		}
	}

	buildUserInstance(authDto: AuthDto) {
		if (!this.userInstance || this.userInstance.userType !== authDto.userType) {
			this.userInstance = new UserAuthFactory().createUser(authDto);
		} else {
			this.userInstance.setData(authDto);
		}

		return this.userInstance;
	}

	setUserToLocalStorage(authDto: AuthDto | null) {
		LocalStorageHelper.setUser(authDto);
	}

	getUserFromLocalStorage(): AuthDto | null {
		return LocalStorageHelper.user;
	}

	async getUserByToken(token: string, callbacks: IApiResponseCallbacks<IUser>) {
		try {
			const authDto = await this.authApi.getMe(token);
			const user = this.buildUserInstance(authDto);
			callbacks.handleSuccess(user);
		} catch (error) {
			handleHttpError(error, callbacks);
		}
	}
}
