import { configureStore } from '@reduxjs/toolkit';
import { memberSlice } from 'app/modules/member/storage/memberSlice';

export const store = configureStore({
	reducer: {
		member: memberSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
	devTools: true
});
