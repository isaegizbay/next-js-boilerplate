import { createSlice } from '@reduxjs/toolkit';
import type { IMemberModuleState } from "@app/modules/member/types/IMemberModuleState";
import { getEntityInitialState } from "@app/shared/Entity/functions/getEntityInitialState";
import { Member } from "@app/modules/member/models/Member.model";
import { EntityNames } from "@app/shared/Entity/enums/EntityNames";
import { getEntityReducers } from "@app/shared/Entity/functions/getEntityReducers";

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
