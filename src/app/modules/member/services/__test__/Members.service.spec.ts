import { UserTypes } from "@app/shared/User/enums/UserTypes";
import {
	DEVELOPER_USER,
	GUEST_USER,
	MAINTAINER_USER
} from "@app/shared/Http/classes/axios/mocks/member/MemberMocksData";
import type { AuthDto } from "@app/shared/User/types/AuthDto";
import { LocalStorageHelper } from "@app/utils/classses/LocalStorageHelper";
import type { IApiResponseCallbacks } from "@app/shared/Http/types/IApiResponseCallbacks";
import { AxiosError } from "axios";
import type { CreateMemberPayload } from "@app/modules/member/types/CreateMemberPayload";
import type { UpdateMemberPayload } from "@app/modules/member/types/UpdateMemberPayload";
import { initAppContainer } from "@app/container/functions/initAppContainer";
import { appContainer } from "@app/container/constants/appContainer";
import type { MockAxiosActionTypes } from "@app/shared/Http/types/MockAxiosActionTypes";
import { TYPES } from "@app/container/constants/TYPES";
import { AppContainerStrategies } from "@app/container/enums/AppContainerStrategies";
import type { IMemberService } from "@app/modules/member/types/IMemberService";

function mockLocalStorageUserToken(userType: UserTypes) {
	const getUser = () => {
		switch (userType) {
			case UserTypes.GUEST:
				return GUEST_USER as AuthDto;
			case UserTypes.DEVELOPER:
				return DEVELOPER_USER as AuthDto;
			case UserTypes.MAINTAINER:
				return MAINTAINER_USER as AuthDto;
		}
	};
	jest.restoreAllMocks();
	jest.spyOn(LocalStorageHelper, 'user', 'get').mockImplementation(getUser);
	jest
		.spyOn(LocalStorageHelper, 'userToken', 'get')
		.mockImplementation(() => getUser().token);
}

const userTypes = [UserTypes.GUEST, UserTypes.DEVELOPER, UserTypes.MAINTAINER];

const memberServiceMethodsCallbacks: IApiResponseCallbacks<unknown> = {
	handleSuccess(_data: { message: string }): void {},
	handleClientError(_error: AxiosError): void {},
	handleNetworkError(_error: AxiosError): void {},
	handleServerError(_error: AxiosError): void {},
	handleTimeoutError(_error: AxiosError): void {},
	handleUnexpectedError(_error: AxiosError): void {}
};

const createMemberPayload: CreateMemberPayload = {
	email: 'user@gmail.com',
	firstName: 'user',
	lastName: 'user',
	userType: UserTypes.MAINTAINER
};

const editMemberPayload: UpdateMemberPayload = {
	id: 1,
	email: 'user@gmail.com',
	firstName: 'user',
	lastName: 'user',
	userType: UserTypes.MAINTAINER
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _responseSchema = {
	records: expect.any(Array),
	currentPage: 1,
	totalPagesCount: expect.any(Number),
	recordsPerPage: expect.any(Number),
	totalRecordsCount: expect.any(Number)
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _memberDtoSchema = {
	recordId: expect.any(Number),
	id: expect.any(Number),
	firstName: expect.any(String),
	lastName: expect.any(String),
	email: expect.any(String),
	userType: expect.stringMatching(/GUEST|DEVELOPER|MAINTAINER/),
	invited: expect.any(Boolean),
	invitedAt: expect.nullOrAny(String),
	deleted: expect.any(Boolean),
	deletedAt: expect.nullOrAny(String)
};

function mockMemberServiceMethodsCallbacks() {
	memberServiceMethodsCallbacks.handleSuccess = jest.fn();
	memberServiceMethodsCallbacks.handleClientError = jest
		.fn()
		.mockImplementation((_error) => {
			// console.log('clientError', { error });
		});
	memberServiceMethodsCallbacks.handleNetworkError = jest
		.fn()
		.mockImplementation((_error) => {
			// console.log({ error });
		});
	memberServiceMethodsCallbacks.handleServerError = jest
		.fn()
		.mockImplementation((_error) => {
			// console.log({ error });
		});
	memberServiceMethodsCallbacks.handleTimeoutError = jest
		.fn()
		.mockImplementation((_error) => {
			// console.log({ error });
		});
	memberServiceMethodsCallbacks.handleUnexpectedError = jest
		.fn()
		.mockImplementation((error) => {
			console.log('unexpectedError:', { error });
		});
}

const errorActionHandlersMap = [
	{
		actionType: 'NETWORK_ERROR',
		handlerName: 'handleNetworkError',
		getHandler: () => memberServiceMethodsCallbacks.handleNetworkError,
		error: new Error('Network Error')
	},
	{
		actionType: 'SERVER_ERROR',
		handlerName: 'handleServerError',
		getHandler: () => memberServiceMethodsCallbacks.handleServerError,
		error: new Error('Request failed with status code 500')
	},
	{
		actionType: 'CLIENT_ERROR',
		handlerName: 'handleClientError',
		getHandler: () => memberServiceMethodsCallbacks.handleClientError,
		error: new Error('Request failed with status code 403')
	},
	{
		actionType: 'TIMEOUT_ERROR',
		handlerName: 'handleTimeoutError',
		getHandler: () => memberServiceMethodsCallbacks.handleTimeoutError,
		error: new Error('timeout of 0ms exceeded')
	}
];

const memberServiceMethodsMap = [
	{
		methodName: 'fetchRecords',
		getMethod: (memberService: IMemberService) => () =>
			memberService.fetchRecords(1, memberServiceMethodsCallbacks)
	},
	{
		methodName: 'createRecord',
		getMethod: (memberService: IMemberService) => () =>
			memberService.createRecord(
				createMemberPayload,
				memberServiceMethodsCallbacks
			)
	},
	{
		methodName: 'updateRecord',
		getMethod: (memberService: IMemberService) => () =>
			memberService.updateRecord(
				editMemberPayload,
				memberServiceMethodsCallbacks
			)
	},
	{
		methodName: 'deleteRecord',
		getMethod: (memberService: IMemberService) => () =>
			memberService.deleteRecord(1, memberServiceMethodsCallbacks)
	}
];

describe('Member service', () => {
	describe('Api responds with errors', () => {
		describe.each(errorActionHandlersMap)(
			'on actionType $actionType expected to call "$handlerName"',
			({ actionType, getHandler, error }) => {
				beforeEach(async () => {
					await initAppContainer(AppContainerStrategies.TEST);
					appContainer
						.bind<MockAxiosActionTypes>(TYPES.MockAxiosActionTypes)
						.toConstantValue(actionType as MockAxiosActionTypes);
				});
				describe.each(memberServiceMethodsMap)(
					'$methodName:',
					({ methodName, getMethod }) => {
						beforeEach(() => {
							jest.restoreAllMocks();
							mockMemberServiceMethodsCallbacks();
						});
						test.each(userTypes)(
							`%s user calls ${methodName}`,
							async (userType) => {
								mockLocalStorageUserToken(userType);

								const memberService = appContainer.get<IMemberService>(
									TYPES.MemberService
								);

								const method = getMethod(memberService);
								const handler = getHandler();

								await method();
								expect(handler).toHaveBeenCalledTimes(1);
								expect(handler).toHaveBeenCalledWith(error);
							}
						);
					}
				);
			}
		);
	});
});
