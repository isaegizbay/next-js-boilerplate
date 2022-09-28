import axios, { AxiosInstance } from 'axios';
import { inject, injectable } from 'inversify';
import MockAdapter from 'axios-mock-adapter';
import { TYPES } from "@app/container/constants/TYPES";
import type { IAxiosCreator } from "@app/shared/Http/types/IAxiosCreator";
import type { MockAxiosActionTypes } from "@app/shared/Http/types/MockAxiosActionTypes";
import { LocalStorageHelper } from "@app/utils/classses/LocalStorageHelper";
import { AuthApiMock } from "@app/shared/Http/classes/axios/mocks/auth/AuthApiMock";
import { MemberApiMock } from "@app/shared/Http/classes/axios/mocks/member/MemberApiMock";

@injectable()
export class MockAxiosCreator implements IAxiosCreator {
	private mock: MockAdapter;
	private readonly actionType: MockAxiosActionTypes;

	constructor(
		@inject(TYPES.MockAxiosActionTypes) actionType: MockAxiosActionTypes
	) {
		this.mock = new MockAdapter(axios, {});
		this.actionType = actionType;
	}

	private getEntityIdFromUrl(url: string): number {
		const match = url.match(/\/(\d+)/);
		if (match) {
			return Number(match[1]);
		}
		throw new Error(`url: ${url} doesn't contain number`);
	}

	createAxiosInstance(_baseUrl: string): AxiosInstance {
		const instance = axios.create({ baseURL: _baseUrl });
		instance.interceptors.request.use(
			function (config) {
				if (config.headers) {
					config.headers.Authorization = `Bearer ${LocalStorageHelper.userToken}`;
				}
				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);

		this.mock = new MockAdapter(instance);

		switch (this.actionType) {
			case 'OK':
				this.setValidResponse();
				break;
			case 'NETWORK_ERROR':
				this.setNetworkError();
				break;
			case 'SERVER_ERROR':
				this.setServerError();
				break;
			case 'CLIENT_ERROR':
				this.setClientError();
				break;
			case 'TIMEOUT_ERROR':
				this.setTimeoutError();
				break;
			default:
				this.setValidResponse();
		}

		return instance;
	}

	setValidResponse() {
		// Auth endpoints mock
		const authApiMock = new AuthApiMock();
		this.mock.onPost('/auth/login').reply(authApiMock.login);
		this.mock.onGet('/auth/me').reply(authApiMock.getMe);

		// Member endpoints mock
		const memberApiMock = new MemberApiMock();
		this.mock
			.onPost('/member')
			.reply((config) => memberApiMock.createMember(config));
		this.mock
			.onGet('/member/list')
			.reply((config) => memberApiMock.getMemberList(config));
		this.mock.onGet(/\/member\/\d+/).reply((config) => {
			const memberId: number = this.getEntityIdFromUrl(config?.url || '');
			return memberApiMock.getMemberById(config, memberId);
		});
		this.mock
			.onPatch('/member')
			.reply((config) => memberApiMock.editMember(config));
		this.mock.onDelete(/\/member\/\d+/).reply((config) => {
			const memberId: number = this.getEntityIdFromUrl(config?.url || '');
			return memberApiMock.deleteMember(config, memberId);
		});
	}

	setNetworkError() {
		// Member endpoints mock
		this.mock.onPost('/member').networkError();
		this.mock.onGet('/member/list').networkError();
		this.mock.onGet(/\/member\/\d+/).networkError();
		this.mock.onPatch('/member').networkError();
		this.mock.onDelete(/\/member\/\d+/).networkError();
	}

	setTimeoutError() {
		// Member endpoints mock
		this.mock.onPost('/member').timeout();
		this.mock.onGet('/member/list').timeout();
		this.mock.onGet(/\/member\/\d+/).timeout();
		this.mock.onPatch('/member').timeout();
		this.mock.onDelete(/\/member\/\d+/).timeout();
	}

	setServerError() {
		// Member endpoints mock
		this.mock.onPost('/member').reply(() => [500]);
		this.mock.onGet('/member/list').reply(() => [500]);
		this.mock.onGet(/\/member\/\d+/).reply(() => [500]);
		this.mock.onPatch('/member').reply(() => [500]);
		this.mock.onDelete(/\/member\/\d+/).reply(() => [500]);
	}

	setClientError() {
		// Member endpoints mock
		this.mock.onPost('/member').reply(() => [403]);
		this.mock.onGet('/member/list').reply(() => [403]);
		this.mock.onGet(/\/member\/\d+/).reply(() => [403]);
		this.mock.onPatch('/member').reply(() => [403]);
		this.mock.onDelete(/\/member\/\d+/).reply(() => [403]);
	}
}
