import { BaseApi } from 'app/shared/Http/classes/';
import type { IAuthApi } from 'app/modules/auth/types/';
import type { LoginPayload } from 'app/modules/auth/types/';
import { IUser } from 'app/shared/User/types';

export class AuthApi extends BaseApi implements IAuthApi {
	login(payload: LoginPayload): Promise<string> {
		return this.post<string>('/auth/login', payload);
	}

	async getMe(token: string): Promise<IUser> {
		return this.get<IUser>('/auth/me', { params: { token } });
	}
}
