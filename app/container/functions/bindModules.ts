import { Container } from 'inversify';
import { AuthService } from 'app/modules/auth/services';
import { TYPES } from 'app/container/constants/TYPES';
import type { IAuthApi } from 'app/modules/auth/types';
import { AuthApi } from 'app/modules/auth/api';
import type { IMemberApi, IMemberService } from 'app/modules/member/types';
import { MemberService } from 'app/modules/member/services';
import { MemberApi } from 'app/modules/member/api';

export function bindModules(container: Container) {
	// Auth
	container
		.bind<AuthService>(TYPES.AuthService)
		.to(AuthService)
		.inSingletonScope();
	container.bind<IAuthApi>(TYPES.AuthApi).to(AuthApi).inSingletonScope();

	// Member
	container
		.bind<IMemberService>(TYPES.MemberService)
		.to(MemberService)
		.inSingletonScope();
	container.bind<IMemberApi>(TYPES.MemberApi).to(MemberApi).inSingletonScope();
}