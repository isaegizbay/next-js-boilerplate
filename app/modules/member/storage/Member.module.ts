import { EntityModule } from 'app/shared/Entity/classes';
import { Member } from 'app/modules/member/models';
import {
	CreateMemberPayload,
	IMemberService,
	UpdateMemberPayload
} from 'app/modules/member/types';
import { AnyAction } from 'redux';
import type { IMemberModuleState } from 'app/modules/member/types/IMemberModuleState';
import { ThunkDispatch } from 'redux-thunk';
import { useAppSelector } from 'app/storage/redux/hooks';
import { memberSlice } from 'app/modules/member/storage/memberSlice';

export class MemberModule extends EntityModule<
	Member,
	CreateMemberPayload,
	UpdateMemberPayload
> {
	constructor(
		public entityServiceInstance: IMemberService,
		public state: IMemberModuleState,
		public dispatch: ThunkDispatch<IMemberModuleState, undefined, AnyAction>
	) {
		super();
	}
}
