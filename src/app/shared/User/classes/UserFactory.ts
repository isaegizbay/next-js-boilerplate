import type { AuthDto } from "@app/shared/User/types/AuthDto";
import type { IUser } from "@app/shared/User/types/IUser";
import { UserTypes } from "@app/shared/User/enums/UserTypes";
import { Maintainer } from "@app/shared/User/classes/Maintainer";
import { Developer } from "@app/shared/User/classes/Developer";
import { Guest } from "@app/shared/User/classes/Guest";

export class UserAuthFactory {
	createUser(authDto: AuthDto): IUser {
		const { userType } = authDto;
		switch (userType) {
			case UserTypes.MAINTAINER:
				return new Maintainer(authDto);
			case UserTypes.DEVELOPER:
				return new Developer(authDto);
			case UserTypes.GUEST:
				return new Guest(authDto);
			default:
				throw new Error(`Usertype: ${userType} not found`);
		}
	}
}
