import { EntityNames } from 'app/shared/Entity/enums';
import { UserTypes } from 'app/shared/User/enums';
import type { AuthDto, IUser } from 'app/shared/User/types';

export class Developer implements IUser {
	token: string;
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	userType: UserTypes;

	constructor(authDto: AuthDto) {
		if (authDto.userType !== UserTypes.DEVELOPER) {
			throw new Error('Developer must have DEVELOPER user type');
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

	logUser(): void {}
}
