import { AuthService } from '../services';
import { AuthDto } from 'app/shared/User/types';
import { UserTypes } from '../../../shared/User/enums';
import { Developer, Guest, Maintainer } from '../../../shared/User/classes';
import { IAuthModuleState, LoginPayload } from '../types';
import { authSlice } from './authSlice';
import { AppDispatch } from '../../../storage/types';
import { BaseModule } from '../../../storage/classes/BaseModule';

export class AuthModule extends BaseModule<
	IAuthModuleState,
	typeof authSlice.actions
> {
	constructor(
		protected authService: AuthService,
		protected _state: IAuthModuleState,
		protected _actions: typeof authSlice.actions,
		protected _dispatch: AppDispatch
	) {
		super(_state, _actions, _dispatch);
	}

	get state() {
		return this._state;
	}

	get user() {
		const authDto =
			this.state.authDto || this.authService.getUserFromLocalStorage();
		return authDto ? this.authService.buildUserInstance(authDto) : null;
	}

	get isLoggedIn() {
		const user = this.authService.getUserFromLocalStorage();
		return !!this.user || !!user;
	}

	get isLoading() {
		return this.state.isUserLoading || this.state.isAuthLoading;
	}

	get maintainer() {
		return this.user?.userType === UserTypes.MAINTAINER
			? (this.user as Maintainer)
			: null;
	}

	get developer() {
		return this.user?.userType === UserTypes.DEVELOPER
			? (this.user as Developer)
			: null;
	}

	get guest() {
		return this.user?.userType === UserTypes.GUEST
			? (this.user as Guest)
			: null;
	}

	setAuthDto(authDto: AuthDto | null) {
		this._dispatch(this._actions.setAuthDto(authDto));
		this.authService.setUserToLocalStorage(authDto);
	}

	setAuthLoading(isLoading: boolean) {
		this._dispatch(this._actions.setAuthLoading(isLoading));
	}

	setUserLoading(isLoading: boolean) {
		this._dispatch(this._actions.setUserLoading(isLoading));
	}

	async login(payload: LoginPayload) {
		try {
			this.setAuthLoading(true);
			const token = await this.authService.login(payload);
			await this.getUser(token);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("Couldn't get user: ", error);
			this.setAuthLoading(false);
			throw error;
		} finally {
			this.setAuthLoading(false);
		}
	}

	logout() {
		this.setAuthDto(null);
		localStorage.clear();
	}

	async getUser(token: string) {
		try {
			this.setUserLoading(true);
			const user = await this.authService.getUserByToken(token);
			this.setAuthDto(user);
		} catch (error) {
			this.setAuthDto(null);
		} finally {
			this.setUserLoading(false);
		}
	}
}
