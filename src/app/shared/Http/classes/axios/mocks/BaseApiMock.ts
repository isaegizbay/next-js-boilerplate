import { AxiosRequestConfig } from 'axios';
import {
	DEVELOPER_USER,
	GUEST_USER,
	MAINTAINER_USER, MemberMocksData
} from "@app/shared/Http/classes/axios/mocks/member/MemberMocksData";
import type { AuthDto } from "@app/shared/User/types/AuthDto";
import { MockHttpsError } from "@app/shared/Http/classes/axios/mocks/MockHttpsError";
import { UserTypes } from "@app/shared/User/enums/UserTypes";

export class BaseApiMock {
	protected _checkAuthToken(config: AxiosRequestConfig) {
		if (
			config.headers?.Authorization !==
				`Bearer ${(GUEST_USER as AuthDto).token}` &&
			config.headers?.Authorization !==
				`Bearer ${(DEVELOPER_USER as AuthDto).token}` &&
			config.headers?.Authorization !==
				`Bearer ${(MAINTAINER_USER as AuthDto).token}`
		) {
			throw new MockHttpsError({
				status: 401,
				message: 'unauthenticated'
			});
		}
	}

	protected _checkUserTypeForCreate(config: AxiosRequestConfig) {
		const token = config.headers?.Authorization || '';
		const member = MemberMocksData.members.find(
			(member) => token === `Bearer ${(member as AuthDto).token}`
		);
		if (member?.userType !== UserTypes.MAINTAINER) {
			throw new MockHttpsError({
				status: 403,
				message: 'unauthorized'
			});
		}
	}

	protected _checkUserTypeForRead(config: AxiosRequestConfig) {
		const token = config.headers?.Authorization || '';
		const member = MemberMocksData.members.find(
			(member) => token === `Bearer ${(member as AuthDto).token}`
		);
		if (member?.userType === UserTypes.GUEST) {
			throw new MockHttpsError({
				status: 403,
				message: 'unauthorized'
			});
		}
	}

	protected _checkUserTypeForEdit(config: AxiosRequestConfig) {
		const token = config.headers?.Authorization || '';
		const member = MemberMocksData.members.find(
			(member) => token === `Bearer ${(member as AuthDto).token}`
		);
		if (member?.userType !== UserTypes.MAINTAINER) {
			throw new MockHttpsError({
				status: 403,
				message: 'unauthorized'
			});
		}
	}

	protected _checkUserTypeForDelete(config: AxiosRequestConfig) {
		const token = config.headers?.Authorization || '';
		const member = MemberMocksData.members.find(
			(member) => token === `Bearer ${(member as AuthDto).token}`
		);
		if (member?.userType !== UserTypes.MAINTAINER) {
			throw new MockHttpsError({
				status: 403,
				message: 'unauthorized'
			});
		}
	}
}
