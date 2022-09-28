import { inject, injectable } from 'inversify';
import { TYPES } from "@app/container/constants/TYPES";
import type { IMemberService } from "@app/modules/member/types/IMemberService";
import type { IMemberApi } from "@app/modules/member/types/IMemberApi";
import type { IApiResponseCallbacks } from "@app/shared/Http/types/IApiResponseCallbacks";
import type { MemberDto } from "@app/modules/member/types/MemberDto";
import type { IEntityPagination } from "@app/shared/Entity/types/IEntityPagination";
import { Member } from "@app/modules/member/models/Member.model";
import { LocalStorageHelper } from "@app/utils/classses/LocalStorageHelper";
import type { AuthDto } from "@app/shared/User/types/AuthDto";
import { handleHttpError } from "@app/shared/Http/functions/handleHttpError";
import type { CreateMemberPayload } from "@app/modules/member/types/CreateMemberPayload";
import type { UpdateMemberPayload } from "@app/modules/member/types/UpdateMemberPayload";

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
