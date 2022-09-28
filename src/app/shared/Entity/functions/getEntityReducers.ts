import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/types/types-external";
import { EntityFormMode } from "@app/shared/Entity/enums/EntityFormMode";
import type { IEntityModuleState } from "@app/shared/Entity/types/IEntityModuleState";
import type { IEntity } from "@app/shared/Entity/types/IEntity";
import type { IEntityPagination } from "@app/shared/Entity/types/IEntityPagination";

export function getEntityReducers<State extends IEntityModuleState<IEntity>>(
	initialState: State
) {
	return {
		setIsEntityModalOpen(
			state: WritableDraft<IEntityModuleState<IEntity>>,
			action: PayloadAction<boolean>
		) {
			state.isEntityModalOpen = action.payload;
		},
		setEntityFormMode(
			state: WritableDraft<IEntityModuleState<IEntity>>,
			action: PayloadAction<EntityFormMode>
		) {
			state.entityFormMode = action.payload;
		},
		setResource(
			state: WritableDraft<IEntityModuleState<IEntity>>,
			action: PayloadAction<IEntityPagination<IEntity>>
		) {
			state.resource = action.payload;
		},
		setIsResourceLoading(
			state: WritableDraft<IEntityModuleState<IEntity>>,
			action: PayloadAction<boolean>
		) {
			state.isResourceLoading = action.payload;
		},
		setIsCreateLoading(
			state: WritableDraft<IEntityModuleState<IEntity>>,
			action: PayloadAction<boolean>
		) {
			state.isCreateLoading = action.payload;
		},
		setIsEditLoading(
			state: WritableDraft<IEntityModuleState<IEntity>>,
			action: PayloadAction<boolean>
		) {
			state.isEditLoading = action.payload;
		},
		setEditingId(
			state: WritableDraft<IEntityModuleState<IEntity>>,
			action: PayloadAction<number | null>
		) {
			state.editingId = action.payload;
		},
		setDeletingId(
			state: WritableDraft<IEntityModuleState<IEntity>>,
			action: PayloadAction<number | null>
		) {
			state.deletingId = action.payload;
		},
		resetState() {
			return initialState;
		}
	};
}
