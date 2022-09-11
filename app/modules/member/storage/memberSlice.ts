import { IMemberModuleState } from 'app/modules/member/types/IMemberModuleState';
import { createSlice } from '@reduxjs/toolkit';
import { EntityFormMode, EntityNames } from 'app/shared/Entity/enums';

const initialState: IMemberModuleState = {
	resource: null,
	entityFormMode: EntityFormMode.CREATE,
	isCreateLoading: false,
	isEditLoading: false,
	isEntityModalOpen: false,
	isResourceLoading: false,
	deletingId: null,
	editingId: null
};

export const memberSlice = createSlice({
	name: EntityNames.MEMBER,
	initialState,
	reducers: {}
});
