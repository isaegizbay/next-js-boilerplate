import { inject, injectable } from 'inversify';
import { TYPES } from "@app/container/constants/TYPES";
import { mutation } from "@app/storage/decorators/mutation";
import type { IMemberService } from "@app/modules/member/types/IMemberService";
import type { MemberActions } from "@app/modules/member/types/MemberActions";
import type { IMemberModuleState } from "@app/modules/member/types/IMemberModuleState";
import type { UpdateMemberPayload } from "@app/modules/member/types/UpdateMemberPayload";
import type { CreateMemberPayload } from "@app/modules/member/types/CreateMemberPayload";
import { Member } from "@app/modules/member/models/Member.model";
import { EntityModule } from "@app/shared/Entity/classes/EntityModule";

@injectable()
export class MemberModule extends EntityModule<
	Member,
	CreateMemberPayload,
	UpdateMemberPayload,
	IMemberModuleState,
	MemberActions
> {
	constructor(@inject(TYPES.MemberService) protected _service: IMemberService) {
		super(_service);
	}

	@mutation
	increment() {}
}
