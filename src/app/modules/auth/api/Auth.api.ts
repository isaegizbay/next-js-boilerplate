import { BaseApi } from "@app/shared/Http/classes/BaseApi";
import type { IAuthApi } from "@app/modules/auth/types/IAuthApi";
import type { IUser } from "@app/shared/User/types/IUser";
import type { LoginPayload } from "@app/modules/auth/types/LoginPayload";

export class AuthApi extends BaseApi implements IAuthApi {
	login(payload: LoginPayload): Promise<string> {
		return this.post<string>('/auth/login', payload);
	}

	async getMe(token: string): Promise<IUser> {
		return this.get<IUser>('/auth/me', { params: { token } });
	}
}
