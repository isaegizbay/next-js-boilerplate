import { createSlice } from '@reduxjs/toolkit';
import { IMemberModuleState } from 'app/modules/member/types/IMemberModuleState';
import { EntityNames } from 'app/shared/Entity/enums';
import { Member } from '../models';
import { getEntityInitialState } from 'app/shared/Entity/functions';
import { getEntityReducers } from "../../../shared/Entity/functions/getEntityReducers";

const initialState: IMemberModuleState = {
	...getEntityInitialState<Member>(),
	counter: 1
};

export const memberSlice = createSlice({
	name: EntityNames.MEMBER,
	initialState,
	reducers: {
		...getEntityReducers(initialState),
		increment(state) {
			state.counter++;
		}
	}
});
