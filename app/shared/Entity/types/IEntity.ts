import { EntityActions } from '@app/shared/Entity/enums/EntityActions';
import type { IEntityRecord } from '@app/shared/Entity/types/IEntityRecord';

export interface IEntity extends IEntityRecord {
	recordId: number;
	id: number;
	actions: EntityActions[];
}
