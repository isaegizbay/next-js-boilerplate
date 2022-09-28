import { Container } from 'inversify';
import { TYPES } from "@app/container/constants/TYPES";
import { AuthService } from "@app/modules/auth/services/Auth.service";
import type { IAuthApi } from "@app/modules/auth/types/IAuthApi";
import { AuthApi } from "@app/modules/auth/api/Auth.api";
import { AuthModule } from "@app/modules/auth/storage/Auth.module";
import type { IMemberService } from "@app/modules/member/types/IMemberService";
import { MemberService } from "@app/modules/member/services/Member.service";
import type { IMemberApi } from "@app/modules/member/types/IMemberApi";
import { MemberApi } from "@app/modules/member/api/Member.api";
import { MemberModule } from "@app/modules/member/storage/Member.module";

export function bindModules(container: Container) {
	// Auth
	container
		.bind<AuthService>(TYPES.AuthService)
		.to(AuthService)
		.inSingletonScope();
	container.bind<IAuthApi>(TYPES.AuthApi).to(AuthApi).inSingletonScope();
	container
		.bind<AuthModule>(TYPES.AuthModule)
		.to(AuthModule)
		.inSingletonScope();

	// Member
	container
		.bind<IMemberService>(TYPES.MemberService)
		.to(MemberService)
		.inSingletonScope();
	container.bind<IMemberApi>(TYPES.MemberApi).to(MemberApi).inSingletonScope();
	container
		.bind<MemberModule>(TYPES.MemberModule)
		.to(MemberModule)
		.inSingletonScope();
}
