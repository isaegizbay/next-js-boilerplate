import { inject, injectable } from 'inversify';
import { TYPES } from "@app/container/constants/TYPES";
import type { IUser } from "@app/shared/User/types/IUser";
import type { IAuthApi } from "@app/modules/auth/types/IAuthApi";
import type { LoginPayload } from "@app/modules/auth/types/LoginPayload";
import type { AuthDto } from "@app/shared/User/types/AuthDto";
import { UserAuthFactory } from "@app/shared/User/classes/UserFactory";
import { LocalStorageHelper } from "@app/utils/classses/LocalStorageHelper";

@injectable()
export class AuthService {
	private userInstance?: IUser;

	constructor(@inject(TYPES.AuthApi) private authApi: IAuthApi) {
		this.authApi = authApi;
	}

	login(payload: LoginPayload): Promise<string> {
		return this.authApi.login(payload);
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

	async getUserByToken(token: string) {
		try {
			const authDto = await this.authApi.getMe(token);
			return this.buildUserInstance(authDto);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("Couldn't get user: ", error);
			throw error;
		}
	}
}
