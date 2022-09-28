import { BaseApi } from "@app/shared/Http/classes/BaseApi";
import type { IMemberApi } from "@app/modules/member/types/IMemberApi";
import type { CreateMemberPayload } from "@app/modules/member/types/CreateMemberPayload";
import type { MemberDto } from "@app/modules/member/types/MemberDto";
import type { IEntityPagination } from "@app/shared/Entity/types/IEntityPagination";
import type { UpdateMemberPayload } from "@app/modules/member/types/UpdateMemberPayload";

export class MemberApi extends BaseApi implements IMemberApi {
	createEntity(payload: CreateMemberPayload): Promise<{ message: string }> {
		return this.post('/member', payload);
	}

	deleteEntity(id: number): Promise<{ message: string }> {
		return this.delete(`/member/${id}`);
	}

	fetchEntity(id: number): Promise<MemberDto> {
		return this.get<MemberDto>(`member/${id}`);
	}

	fetchEntityList(page: number): Promise<IEntityPagination<MemberDto>> {
		return this.get<IEntityPagination<MemberDto>>('/member/list', {
			params: {
				page
			}
		});
	}

	updateEntity(payload: UpdateMemberPayload): Promise<{ message: string }> {
		return this.patch('/member', payload);
	}
}
