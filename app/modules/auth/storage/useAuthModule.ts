import { appContainer } from 'app/container/constants';
import { TYPES } from 'app/container/constants/TYPES';
import { authSlice } from './authSlice';
import { useAppDispatch, useAppSelector } from 'app/storage';
import { AuthModule } from './Auth.module';
import { AuthService } from '../services';

export function useAuthModule() {
	const state = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const actions = authSlice.actions;

	const authService = appContainer.get<AuthService>(TYPES.AuthService);
	return new AuthModule(authService, state, actions, dispatch);
}
