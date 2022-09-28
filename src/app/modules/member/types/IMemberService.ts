import { Member } from "@app/modules/member/models/Member.model";
import type { IEntityServiceStrategy } from "@app/shared/Entity/types/IEntityServiceStrategy";
import type { CreateMemberPayload } from "@app/modules/member/types/CreateMemberPayload";
import type { UpdateMemberPayload } from "@app/modules/member/types/UpdateMemberPayload";

export interface IMemberService
	extends IEntityServiceStrategy<
		Member,
		CreateMemberPayload,
		UpdateMemberPayload
	> {}
