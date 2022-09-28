import type { IUser } from "@app/shared/User/types/IUser";
import type { LoginPayload } from "@app/modules/auth/types/LoginPayload";

export interface IAuthApi {
	login(payload: LoginPayload): Promise<string>;
	getMe(token: string): Promise<IUser>;
}
