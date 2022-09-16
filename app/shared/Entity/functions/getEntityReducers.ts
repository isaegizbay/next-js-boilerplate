import {
	IEntity,
	IEntityModuleState,
	IEntityPagination,
} from '../types';
import { WritableDraft } from 'immer/dist/types/types-external';
import { PayloadAction } from '@reduxjs/toolkit';
import { EntityFormMode } from '../enums';

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
