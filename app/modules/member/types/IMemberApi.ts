import type { IEntityApiStrategy } from 'app/shared/Entity/types';
import type {
	CreateMemberPayload,
	MemberDto,
	UpdateMemberPayload
} from '../types/';

export interface IMemberApi
	extends IEntityApiStrategy<
		MemberDto,
		CreateMemberPayload,
		UpdateMemberPayload
	> {}
