import type { AuthDto, IUser } from 'app/shared/User/types';
import type { IAuthApi, LoginPayload } from '../types';
import { inject, injectable } from 'inversify';
import { LocalStorageHelper } from 'app/utils';
import { UserAuthFactory } from 'app/shared/User/classes';
import { TYPES } from 'app/container/constants/TYPES';

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
