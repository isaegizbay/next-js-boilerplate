import { UserTypes } from 'app/shared/User/enums';

export interface CreateMemberPayload {
	email: string;
	firstName: string;
	lastName: string;
	userType: UserTypes;
}
