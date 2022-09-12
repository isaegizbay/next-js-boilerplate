import { createSlice } from '@reduxjs/toolkit';
import { IMemberModuleState } from 'app/modules/member/types/IMemberModuleState';
import { EntityNames } from 'app/shared/Entity/enums';
import { entityReducers } from 'app/shared/Entity/constants/entityReducers';
import { Member } from '../models';
import { getEntityInitialState } from 'app/shared/Entity/functions';

const initialState: IMemberModuleState = {
	...getEntityInitialState<Member>(),
	counter: 1
};

export const memberSlice = createSlice({
	name: EntityNames.MEMBER,
	initialState,
	reducers: {
		...entityReducers,
		increment(state) {
			state.counter++;
		}
	}
});
