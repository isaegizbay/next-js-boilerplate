import type { IEntityApiStrategy } from "@app/shared/Entity/types/IEntityApiStrategy";
import type { MemberDto } from "@app/modules/member/types/MemberDto";
import type { CreateMemberPayload } from "@app/modules/member/types/CreateMemberPayload";
import type { UpdateMemberPayload } from "@app/modules/member/types/UpdateMemberPayload";

export interface IMemberApi
	extends IEntityApiStrategy<
		MemberDto,
		CreateMemberPayload,
		UpdateMemberPayload
	> {}
