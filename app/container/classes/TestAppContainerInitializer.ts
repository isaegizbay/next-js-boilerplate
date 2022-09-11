import { IAppContainerInitializerStrategy } from 'app/container/types';
import { bindModules } from 'app/container/functions/bindModules';
import { IAxiosCreator } from 'app/shared/Http/types';
import { TYPES } from 'app/container/constants/TYPES';
import { MockAxiosCreator } from 'app/shared/Http/classes/axios/creators/MockAxiosCreator';
import { Container } from 'inversify';
import { AuthService } from 'app/modules/auth/services';
import { IAuthApi } from 'app/modules/auth/types';
import { AuthApi } from 'app/modules/auth/api';
import { IMemberApi, IMemberService } from 'app/modules/member/types';
import { MemberService } from 'app/modules/member/services';
import { MemberApi } from 'app/modules/member/api';

export class TestAppContainerInitializer
	implements IAppContainerInitializerStrategy
{
	initContainer(container: Container): void {
		// MockAxios
		container
			.bind<IAxiosCreator>(TYPES.AxiosCreator)
			.to(MockAxiosCreator)
			.inSingletonScope();

		bindModules(container);
	}
}
