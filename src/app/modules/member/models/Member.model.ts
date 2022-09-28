import { IEntity } from "@app/shared/Entity/types/IEntity";
import { MemberDto } from "@app/modules/member/types/MemberDto";
import { UserTypes } from "@app/shared/User/enums/UserTypes";
import { AuthDto } from "@app/shared/User/types/AuthDto";
import { EntityUserActions } from "@app/shared/Entity/enums/EntityUserActions";

export class Member implements IEntity, MemberDto {
	recordId: number;
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	userType: UserTypes;

	invited: boolean;
	invitedAt: Date | null;
	deleted: boolean;
	deletedAt: Date | null;

	isMemberAuthUser: boolean;

	constructor(memberDto: MemberDto, authUser: AuthDto) {
		this.recordId = memberDto.recordId;

		this.id = memberDto.id;
		this.firstName = memberDto.firstName;
		this.lastName = memberDto.lastName;
		this.email = memberDto.email;
		this.userType = memberDto.userType;

		this.invited = memberDto.invited;
		this.invitedAt = memberDto.invitedAt;
		this.deleted = memberDto.deleted;
		this.deletedAt = memberDto.deletedAt;

		this.isMemberAuthUser = memberDto.id === authUser.id;
	}

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	get actions(): EntityUserActions[] {
		const actionsSet = [EntityUserActions.EDIT, EntityUserActions.DELETE];
		return this.isMemberAuthUser ? [] : actionsSet;
	}
}
