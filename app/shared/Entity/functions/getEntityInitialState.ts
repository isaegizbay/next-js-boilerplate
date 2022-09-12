import { IEntity, IEntityModuleState } from "../types";
import { EntityFormMode } from "../enums";

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
