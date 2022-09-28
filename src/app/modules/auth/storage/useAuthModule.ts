import { appContainer } from "@app/container/constants/appContainer";
import { TYPES } from "@app/container/constants/TYPES";
import { useAppSelector } from "@app/storage/hooks/useAppSelector";
import { useAppDispatch } from "@app/storage/hooks/useAppDispatch";
import { authSlice } from "@app/modules/auth/storage/authSlice";
import { AuthModule } from "@app/modules/auth/storage/Auth.module";

export function useAuthModule() {
	const state = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const actions = authSlice.actions;

	const authModule = appContainer.get<AuthModule>(TYPES.AuthModule);
	authModule.initModule(state, actions, dispatch);

	return authModule;
}
