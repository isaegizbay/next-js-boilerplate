import { IEntityRecord } from "./IEntityRecord";
import { EntityUserActions } from "../enums";

export interface IEntity extends IEntityRecord {
	recordId: number;
	id: number;
	actions: EntityUserActions[];
}
