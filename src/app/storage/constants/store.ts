import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from "@app/modules/auth/storage/authSlice";
import { memberSlice } from "@app/modules/member/storage/memberSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		member: memberSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
	devTools: true
});
