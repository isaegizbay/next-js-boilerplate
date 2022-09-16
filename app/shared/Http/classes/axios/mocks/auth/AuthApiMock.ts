import { BaseApiMock } from '../BaseApiMock';
import { AxiosRequestConfig } from 'axios';
import { MockHttpsError } from '../MockHttpsError';
import { MemberMocksData } from '../member/MemberMocksData';
import type { AuthDto, IUser } from 'app/shared/User/types';

export class AuthApiMock extends BaseApiMock {
	login(config: AxiosRequestConfig): Promise<[number, string]> {
		const payload = JSON.parse(config.data);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const { email, password } = payload;
				if (!email || !password) {
					return reject(
						new MockHttpsError({ status: 400, message: 'wrong credentials' })
					);
				}

				const user = MemberMocksData.members.find(
					(user) => user.email === email
				) as AuthDto;

				if (!user) {
					reject(
						new MockHttpsError({ status: 400, message: 'wrong credentials' })
					);
				}

				resolve([200, user.token]);
			}, 0);
		});
	}

	getMe(config: AxiosRequestConfig): Promise<[number, string]> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (!config.params.token) {
					return reject(
						new MockHttpsError({ status: 400, message: 'wrong credentials' })
					)
				}

				const user = MemberMocksData.members.find(
					(member) => (member as AuthDto).token === config.params.token
				)  as AuthDto;
				if (!user) {
					return reject(
						new MockHttpsError({ status: 400, message: 'wrong credentials' })
					);
				}

				resolve([200, JSON.stringify(user)]);
			}, 0);
		});
	}
}
