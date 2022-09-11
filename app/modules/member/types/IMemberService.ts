import { IEntityServiceStrategy } from 'app/shared/Entity/types';
import { Member } from 'app/modules/member/models';
import {
	CreateMemberPayload,
	UpdateMemberPayload
} from 'app/modules/member/types/';

export interface IMemberService
	extends IEntityServiceStrategy<
		Member,
		CreateMemberPayload,
		UpdateMemberPayload
	> {}
