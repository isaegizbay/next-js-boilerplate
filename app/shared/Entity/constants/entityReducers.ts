import { AnyAction, createReducer, current, PayloadAction } from '@reduxjs/toolkit';
import {
	IEntity,
	IEntityModuleState,
	IEntityPagination
} from 'app/shared/Entity/types';
import { EntityFormMode } from 'app/shared/Entity/enums';
import { WritableDraft } from 'immer/dist/types/types-external';

export const entityReducers = {
	setIsEntityModalOpen(
		state: WritableDraft<IEntityModuleState<IEntity>>,
		{ payload }: PayloadAction<boolean>
	) {
		state.isEntityModalOpen = payload;
	},
	setEntityFormMode(
		state: WritableDraft<IEntityModuleState<IEntity>>,
		{ payload }: PayloadAction<EntityFormMode>
	) {
		state.entityFormMode = payload;
	},
	setResource(
		state: WritableDraft<IEntityModuleState<IEntity>>,
		{ payload }: PayloadAction<IEntityPagination<IEntity>>
	) {
		state.resource = payload;
	},
	setIsResourceLoading(
		state: WritableDraft<IEntityModuleState<IEntity>>,
		{ payload }: PayloadAction<boolean>
	) {
		state.isResourceLoading = payload;
	},
	setIsCreateLoading(
		state: WritableDraft<IEntityModuleState<IEntity>>,
		{ payload }: PayloadAction<boolean>
	) {
		state.isCreateLoading = payload;
	},
	setIsEditLoading(
		state: WritableDraft<IEntityModuleState<IEntity>>,
		{ payload }: PayloadAction<boolean>
	) {
		state.isEditLoading = payload;
	},
	setEditingId(
		state: WritableDraft<IEntityModuleState<IEntity>>,
		{ payload }: PayloadAction<number | null>
	) {
		state.editingId = payload;
	},
	setDeletingId(
		state: WritableDraft<IEntityModuleState<IEntity>>,
		{ payload }: PayloadAction<number | null>
	) {
		state.deletingId = payload;
	},
	resetState(
		state: WritableDraft<IEntityModuleState<IEntity>>,
		{ payload }: PayloadAction<IEntityModuleState<IEntity>>
	) {
		state = payload;
	}
};
