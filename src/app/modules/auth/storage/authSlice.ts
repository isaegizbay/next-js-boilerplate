import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IAuthModuleState } from "@app/modules/auth/types/IAuthModuleState";
import type { AuthDto } from "@app/shared/User/types/AuthDto";

const initialState: IAuthModuleState = {
	authDto: null,
	isAuthLoading: false,
	isUserLoading: false
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthDto(state, { payload }: PayloadAction<AuthDto | null>) {
			state.authDto = payload;
		},
		setAuthLoading(state, { payload }: PayloadAction<boolean>) {
			state.isAuthLoading = payload;
		},
		setUserLoading(state, { payload }: PayloadAction<boolean>) {
			state.isUserLoading = payload;
		}
	}
});
