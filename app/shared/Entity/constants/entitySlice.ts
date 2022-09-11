import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import {
	IEntity,
	IEntityModuleState,
	IEntityPagination,
	IEntityRecord
} from 'app/shared/Entity/types';
import { EntityFormMode } from 'app/shared/Entity/enums';

const initialState: IEntityModuleState<IEntity> = {
	resource: null,
	deletingId: null,
	editingId: null,
	entityFormMode: EntityFormMode.CREATE,
	isCreateLoading: false,
	isEditLoading: false,
	isEntityModalOpen: false,
	isResourceLoading: false
};

export const entitySlice = createSlice({
	name: 'entity',
	initialState,
	reducers: {
		setIsEntityModalOpen(state, { payload }: PayloadAction<boolean>) {
			state.isEntityModalOpen = payload;
		},
		setEntityFormMode(state, { payload }: PayloadAction<EntityFormMode>) {
			state.entityFormMode = payload;
		},
		setResource(state, { payload }: PayloadAction<IEntityPagination<IEntity>>) {
			state.resource = payload;
		},
		setIsResourceLoading(state, { payload }: PayloadAction<boolean>) {
			state.isResourceLoading = payload;
		},
		setIsCreateLoading(state, { payload }: PayloadAction<boolean>) {
			state.isCreateLoading = payload;
		},
		setIsEditLoading(state, { payload }: PayloadAction<boolean>) {
			state.isEditLoading = payload;
		},
		setEditingId(state, { payload }: PayloadAction<number | null>) {
			state.editingId = payload;
		},
		setDeletingId(state, { payload }: PayloadAction<number | null>) {
			state.deletingId = payload;
		},
		resetState(state, { payload }: PayloadAction<IEntityModuleState<IEntity>>) {
			state = payload;
		}
	}
});
