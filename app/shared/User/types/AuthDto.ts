import { UserDto } from "app/shared/User/types/UserDto";

export interface AuthDto extends UserDto {
	token: string;
}
