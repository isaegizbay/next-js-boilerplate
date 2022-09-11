import type { AuthDto, IUser } from '../types';
import { UserTypes } from '../enums';
import { Developer, Guest, Maintainer } from '../classes/';

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
