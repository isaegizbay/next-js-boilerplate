import type { AuthDto } from "@app/shared/User/types/AuthDto";
import type { UserDto } from "@app/shared/User/types/UserDto";
import { EntityNames } from "@app/shared/Entity/enums/EntityNames";

export interface IUser extends AuthDto, UserDto {
	setData(authDto: AuthDto): void;
	logUser(): void;
	canCreateEntity(entityName: EntityNames): boolean;
	canViewEntityDetails(entityName: EntityNames): boolean;
	canViewEntityList(entityName: EntityNames): boolean;
	canEditEntity(entityName: EntityNames): boolean;
	canDeleteEntity(entityName: EntityNames): boolean;
}
