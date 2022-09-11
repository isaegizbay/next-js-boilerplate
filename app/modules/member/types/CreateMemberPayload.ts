import { UserTypes } from '@app/shared/User/enums/UserTypes';

export interface CreateMemberPayload {
	email: string;
	firstName: string;
	lastName: string;
	userType: UserTypes;
}
