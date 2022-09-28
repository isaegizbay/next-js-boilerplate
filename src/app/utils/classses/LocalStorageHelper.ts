import type { AuthDto } from "@app/shared/User/types/AuthDto";

export class LocalStorageHelper {
	static get userToken(): string {
		return this.user?.token || '';
	}

	static get user(): AuthDto | null {
		const user = localStorage.getItem('user');

		return user?.length ? JSON.parse(user) : null;
	}

	static setUser(authDto: AuthDto | null) {
		localStorage.setItem('user', JSON.stringify(authDto));
	}
}
