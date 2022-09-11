import type { UserDto } from 'app/shared/User/types';
import type { IEntityPagination, IEntityRecord } from 'app/shared/Entity/types';

export interface MemberDto extends UserDto, IEntityRecord {
	invited: boolean;
	invitedAt: Date | null;

	deleted: boolean;
	deletedAt: Date | null;
}
