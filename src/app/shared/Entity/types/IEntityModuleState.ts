import type { IEntityPagination } from "@app/shared/Entity/types/IEntityPagination";
import type { IEntity } from "@app/shared/Entity/types/IEntity";
import { EntityFormMode } from "@app/shared/Entity/enums/EntityFormMode";

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
