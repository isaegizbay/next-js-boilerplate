
@Module
export class AuthModule extends {
	private authService: AuthService;
	private userDto: AuthDto | null = null;
	isUserLoading = false;
	isAuthLoading = false;

	constructor(
		@inject(DependencyIds.AuthService) authService: AuthService,
		store: Store<IRootState>
	) {
		super({ store, name: 'auth' });
		this.authService = authService;
	}

	get user() {
		const userDto = this.userDto || this.authService.getUserFromLocalStorage();
		return userDto ? this.authService.buildUserInstance(userDto) : null;
	}

	get isLoggedIn() {
		const user = this.authService.getUserFromLocalStorage();
		return !!this.user || !!user;
	}

	get isLoading() {
		return this.isUserLoading || this.isAuthLoading;
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

	@Mutation
	setUser(user: AuthDto | null) {
		this.userDto = user;
		this.authService.setUserToLocalStorage(user);
	}

	@Mutation
	setAuthLoading(isLoading: boolean) {
		this.isAuthLoading = isLoading;
	}

	@Mutation
	setUserLoading(isLoading: boolean) {
		this.isUserLoading = isLoading;
	}

	@Action
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

	@Action
	logout() {
		this.setUser(null);
		localStorage.clear();
	}

	@Action
	async getUser(token: string) {
		try {
			this.setUserLoading(true);
			const user = await this.authService.getUserByToken(token);
			this.setUser(user);
		} catch (error) {
			this.setUser(null);
		} finally {
			this.setUserLoading(false);
		}
	}
}
