import { inject, injectable } from 'inversify';
import { EntityModule } from 'app/shared/Entity/classes';
import { Member } from 'app/modules/member/models';
import type {
	CreateMemberPayload,
	IMemberModuleState,
	IMemberService,
	MemberActions,
	UpdateMemberPayload
} from 'app/modules/member/types';
import { TYPES } from 'app/container/constants/TYPES';

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

	increment() {
		this._dispatch(this._actions.increment());
	}
}
