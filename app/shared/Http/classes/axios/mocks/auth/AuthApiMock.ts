import { BaseApiMock } from '../BaseApiMock';
import { AxiosRequestConfig } from 'axios';
import { MockHttpsError } from '../MockHttpsError';
import { MemberMocksData } from '../member/MemberMocksData';
import type { AuthDto } from 'app/shared/User/types';

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
			}, 3000);
		});
	}
}
