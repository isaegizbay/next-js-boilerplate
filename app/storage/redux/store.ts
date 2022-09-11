import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { memberSlice } from 'app/modules/member/storage/memberSlice';
// ...

export const store = configureStore({
	reducer: {
		member: memberSlice.reducer
	},
	middleware: [
		...getDefaultMiddleware({
			serializableCheck: false
		})
	],
	devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
