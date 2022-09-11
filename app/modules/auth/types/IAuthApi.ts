import type { IUser } from 'app/shared/User/types';
import type { LoginPayload } from '../types';

export interface IAuthApi {
	login(payload: LoginPayload): Promise<string>;
	getMe(token: string): Promise<IUser>;
}
