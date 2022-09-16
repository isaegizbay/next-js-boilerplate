import { AuthService } from '../services';
import { AuthDto } from 'app/shared/User/types';
import { UserTypes } from '../../../shared/User/enums';
import { Developer, Guest, Maintainer } from '../../../shared/User/classes';
import { IAuthModuleState, LoginPayload } from '../types';
import { authSlice } from './authSlice';
import { Module } from 'app/storage/classes/Module';
import { mutation } from 'app/storage/decorators';
import { inject, injectable } from 'inversify';
import { TYPES } from 'app/container/constants/TYPES';

@injectable()
export class AuthModule extends Module<
	IAuthModuleState,
	typeof authSlice.actions
> {
	constructor(@inject(TYPES.AuthService) protected authService: AuthService) {
		super();
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

	@mutation
	setAuthDto(authDto: AuthDto | null) {
		this.authService.setUserToLocalStorage(authDto);
	}

	@mutation
	setAuthLoading(_isLoading: boolean) {}

	@mutation
	setUserLoading(_isLoading: boolean) {}

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
