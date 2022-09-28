import { BaseApiMock } from "@app/shared/Http/classes/axios/mocks/BaseApiMock";
import { AxiosRequestConfig } from "axios";
import { MockHttpsError } from "@app/shared/Http/classes/axios/mocks/MockHttpsError";
import { MemberMocksData } from "@app/shared/Http/classes/axios/mocks/member/MemberMocksData";
import type { AuthDto } from "@app/shared/User/types/AuthDto";

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
			}, 1000);
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
			}, 1000);
		});
	}
}
