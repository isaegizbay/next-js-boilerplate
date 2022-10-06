import { AxiosRequestConfig } from 'axios';
import { BaseApiMock } from "@app/shared/Http/classes/axios/mocks/BaseApiMock";
import { MockHttpsError } from "@app/shared/Http/classes/axios/mocks/MockHttpsError";
import { MemberMocksData } from "@app/shared/Http/classes/axios/mocks/member/MemberMocksData";
import type { MemberDto } from "@app/modules/member/types/MemberDto";

export class MemberApiMock extends BaseApiMock {
	createMember(config: AxiosRequestConfig): Promise<[number, string]> {
		const payload = JSON.parse(config.data);
		return new Promise((resolve) => {
			try {
				this._checkAuthToken(config);
				this._checkUserTypeForCreate(config);
			} catch (error) {
				const authError = error as MockHttpsError;
				return resolve([authError.status, authError.message]);
			}

			setTimeout(() => {
				if (
					MemberMocksData.members.find(
						(member) => member.email === payload.email
					)
				) {
					return resolve([
						409,
						JSON.stringify({ message: 'record already exists' })
					]);
				}

				MemberMocksData.members = [
					{
						...payload,
						id: MemberMocksData.members.length,
						invited: true,
						invitedAt: Date.now().toString(),
						deleted: false,
						deletedAt: null
					},
					...MemberMocksData.members
				];
				resolve([
					201,
					JSON.stringify({
						message: 'new record successfully created'
					})
				]);
			}, 0);
		});
	}

	getMemberById(
		config: AxiosRequestConfig,
		memberId: number
	): Promise<[number, string]> {
		return new Promise((resolve) => {
			try {
				this._checkAuthToken(config);
				this._checkUserTypeForRead(config);
			} catch (error) {
				const authError = error as MockHttpsError;
				return resolve([authError.status, authError.message]);
			}

			setTimeout(() => {
				const member = MemberMocksData.members.find(
					(member) => member.id === memberId
				);
				resolve([200, JSON.stringify(member)]);
			}, 0);
		});
	}

	getMemberList(config: AxiosRequestConfig): Promise<[number, string]> {
		return new Promise((resolve) => {
			try {
				this._checkAuthToken(config);
				this._checkUserTypeForRead(config);
			} catch (error) {
				const authError = error as MockHttpsError;
				return resolve([authError.status, authError.message]);
			}

			const members = MemberMocksData.members as MemberDto[];
			const totalRecords: MemberDto[] = members.map((member, idx) => ({
				...member,
				recordId: idx + 1
			}));

			const recordsPerPage = 15;
			setTimeout(() => {
				const response = {
					records: totalRecords.slice(
						recordsPerPage * (config.params.page - 1),
						recordsPerPage * config.params.page
					),
					totalPagesCount: Math.ceil(totalRecords.length / recordsPerPage),
					recordsPerPage,
					currentPage: config.params.page,
					totalRecordsCount: totalRecords.length
				};

				resolve([200, JSON.stringify(response)]);
			}, 3000);
		});
	}

	editMember(config: AxiosRequestConfig): Promise<[number, string]> {
		const payload = JSON.parse(config.data);
		return new Promise((resolve) => {
			try {
				this._checkAuthToken(config);
				this._checkUserTypeForEdit(config);
			} catch (error) {
				const authError = error as MockHttpsError;
				return resolve([authError.status, authError.message]);
			}

			setTimeout(() => {
				const payloadCopy = JSON.parse(JSON.stringify(payload));
				MemberMocksData.members = MemberMocksData.members.map((member) => {
					if (payloadCopy.id === member.id) {
						return {
							...member,
							...payloadCopy
						};
					}
					return member;
				});
				resolve([
					204,
					JSON.stringify({ message: 'record updated successfully' })
				]);
			}, 0);
		});
	}

	deleteMember(
		config: AxiosRequestConfig,
		memberId: number
	): Promise<[number, string]> {
		return new Promise((resolve) => {
			try {
				this._checkAuthToken(config);
				this._checkUserTypeForDelete(config);
			} catch (error) {
				const authError = error as MockHttpsError;
				return resolve([authError.status, authError.message]);
			}

			setTimeout(() => {
				MemberMocksData.members = MemberMocksData.members.map((member) => {
					if (member.id !== memberId) {
						return member;
					}
					return {
						...member,
						deleted: true,
						deletedAt: Date.now().toString()
					} as any;
				});
				resolve([
					204,
					JSON.stringify({ message: 'record deleted successfully' })
				]);
			}, 0);
		});
	}
}
