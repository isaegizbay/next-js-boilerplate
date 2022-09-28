import { IEntityRecord } from "./IEntityRecord";
import { EntityUserActions } from "@app/shared/Entity/enums/EntityUserActions";

export interface IEntity extends IEntityRecord {
	recordId: number;
	id: number;
	actions: EntityUserActions[];
}
