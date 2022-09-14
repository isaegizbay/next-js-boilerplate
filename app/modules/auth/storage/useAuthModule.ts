import { appContainer } from 'app/container/constants';
import { TYPES } from 'app/container/constants/TYPES';
import { authSlice } from './authSlice';
import { useAppDispatch, useAppSelector } from 'app/storage';
import { AuthModule } from './Auth.module';

export function useAuthModule() {
	const state = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const actions = authSlice.actions;

	const authModule = appContainer.get<AuthModule>(TYPES.AuthModule);
	authModule.initModule(state, actions, dispatch);

	return authModule;
}
