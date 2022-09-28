import type { UserDto } from "@app/shared/User/types/UserDto";
import type { IEntityRecord } from "@app/shared/Entity/types/IEntityRecord";

export interface MemberDto extends UserDto, IEntityRecord {
	invited: boolean;
	invitedAt: Date | null;

	deleted: boolean;
	deletedAt: Date | null;
}
