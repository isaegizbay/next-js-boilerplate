import type { IEntity, IEntityPagination } from '../types';
import { EntityFormMode } from 'app/shared/Entity/enums';

export interface IEntityModuleState<E extends IEntity> {
	resource: IEntityPagination<E> | null;
	isResourceLoading: boolean;
	isCreateLoading: boolean;
	isEditLoading: boolean;
	editingId: number | null;
	deletingId: number | null;
	isEntityModalOpen: boolean;
	entityFormMode: EntityFormMode;
}
