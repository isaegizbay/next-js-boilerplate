import type { IEntity } from "@app/shared/Entity/types/IEntity";
import type { IEntityModuleState } from "@app/shared/Entity/types/IEntityModuleState";
import { EntityFormMode } from "@app/shared/Entity/enums/EntityFormMode";

export function getEntityInitialState<E extends IEntity> (): IEntityModuleState<E>{
  return {
    resource: null,
    deletingId: null,
    editingId: null,
    entityFormMode: EntityFormMode.CREATE,
    isCreateLoading: false,
    isEditLoading: false,
    isEntityModalOpen: false,
    isResourceLoading: false
  }
}
