import { UserTypes } from 'app/shared/User/enums';

export interface UpdateMemberPayload {
	id: number;
	email?: string;
	firstName?: string;
	lastName?: string;
	userType?: UserTypes;
}
