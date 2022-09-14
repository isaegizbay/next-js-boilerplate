import type { AuthDto, IUser } from 'app/shared/User/types';
import { UserTypes } from 'app/shared/User/enums';
import { EntityNames } from 'app/shared/Entity/enums';

export class Maintainer implements IUser {
	token: string;
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	userType: UserTypes;

	constructor(authDto: AuthDto) {
		if (authDto.userType !== UserTypes.MAINTAINER) {
			throw new Error('Maintainer must have MAINTAINER user type');
		}

		this.token = authDto.token;
		this.id = authDto.id;
		this.firstName = authDto.firstName;
		this.lastName = authDto.lastName;
		this.email = authDto.email;
		this.userType = authDto.userType;
	}

	setData(authDto: AuthDto) {
		this.token = authDto.token;
		this.id = authDto.id;
		this.firstName = authDto.firstName;
		this.lastName = authDto.lastName;
		this.email = authDto.email;
		this.userType = authDto.userType;
	}

	logUser() {
		// eslint-disable-next-line no-console
		console.log('LOGGING MAINTAINER: ', { user: this });
	}

	canCreateEntity(_entityName: EntityNames): boolean {
		return false;
	}

	canDeleteEntity(_entityName: EntityNames): boolean {
		return false;
	}

	canEditEntity(_entityName: EntityNames): boolean {
		return false;
	}

	canViewEntityDetails(_entityName: EntityNames): boolean {
		return false;
	}

	canViewEntityList(_entityName: EntityNames): boolean {
		return false;
	}
}
