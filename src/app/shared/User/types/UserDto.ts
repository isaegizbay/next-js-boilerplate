import { UserTypes } from "@app/shared/User/enums/UserTypes";

export interface UserDto {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	userType: UserTypes;
}
