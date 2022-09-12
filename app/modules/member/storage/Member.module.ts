import { EntityModule } from 'app/shared/Entity/classes';
import { Member } from 'app/modules/member/models';
import {
	CreateMemberPayload,
	IMemberService,
	UpdateMemberPayload
} from 'app/modules/member/types';
import type { IMemberModuleState } from 'app/modules/member/types/IMemberModuleState';
import { memberSlice } from 'app/modules/member/storage/memberSlice';
import { AppDispatch } from '../../../storage/types';

export class MemberModule extends EntityModule<
	Member,
	CreateMemberPayload,
	UpdateMemberPayload
> {
	constructor(
		protected _service: IMemberService,
		protected _state: IMemberModuleState,
		protected _actions: typeof memberSlice.actions,
		protected _dispatch: AppDispatch
	) {
		super(_service, _state, _actions, _dispatch);
	}

	get state() {
		return this._state;
	}

	increment() {
		this._dispatch(this._actions.increment());
	}
}
