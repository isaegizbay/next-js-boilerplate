import { configureStore } from '@reduxjs/toolkit';
import { memberSlice } from 'app/modules/member/storage/memberSlice';
import { authSlice } from '../../modules/auth/storage/authSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		member: memberSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
	devTools: true
});
