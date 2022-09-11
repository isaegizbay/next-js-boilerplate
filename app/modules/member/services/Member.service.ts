import { inject, injectable } from 'inversify';
import type {
	CreateMemberPayload,
	IMemberApi,
	IMemberService,
	MemberDto,
	UpdateMemberPayload
} from 'app/modules/member/types';
import type { IEntityPagination } from 'app/shared/Entity/types';
import { Member } from 'app/modules/member/models';
import type { AuthDto } from 'app/shared/User/types';
import { LocalStorageHelper } from 'app/utils';
import { handleHttpError } from 'app/shared/Http/functions';
import type { IApiResponseCallbacks } from 'app/shared/Http/types';
import { TYPES } from 'app/container/constants/TYPES';

@injectable()
export class MemberService implements IMemberService {
	constructor(@inject(TYPES.MemberApi) private apiInstance: IMemberApi) {}

	async fetchRecords(
		page: number,
		callbacks: IApiResponseCallbacks<IEntityPagination<MemberDto>>
	) {
		try {
			const response = await this.apiInstance.fetchEntityList(page);
			const memberPagination = {
				...response,
				records:
					response?.records?.map(
						(record) => new Member(record, LocalStorageHelper.user as AuthDto)
					) || []
			};
			callbacks.handleSuccess(memberPagination);
		} catch (e) {
			handleHttpError(e, callbacks);
		}
	}

	fetchRecord(): Promise<Member> {
		throw new Error('Method not implemented.');
	}

	async createRecord(
		payload: CreateMemberPayload,
		callbacks: IApiResponseCallbacks
	) {
		try {
			const response = await this.apiInstance.createEntity(payload);
			callbacks.handleSuccess(response);
		} catch (error) {
			handleHttpError(error, callbacks);
		}
	}

	async updateRecord(
		payload: UpdateMemberPayload,
		callbacks: IApiResponseCallbacks
	) {
		try {
			const response = await this.apiInstance.updateEntity({
				...payload
			});

			callbacks.handleSuccess(response);
		} catch (error) {
			handleHttpError(error, callbacks);
		}
	}

	async deleteRecord(
		entityId: number,
		callbacks: IApiResponseCallbacks
	): Promise<void> {
		try {
			const response = await this.apiInstance.deleteEntity(entityId);
			callbacks.handleSuccess(response);
		} catch (error) {
			handleHttpError(error, callbacks);
		}
	}
}
