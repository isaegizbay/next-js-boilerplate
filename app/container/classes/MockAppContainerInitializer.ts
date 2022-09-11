import { IAppContainerInitializerStrategy } from 'app/container/types';
import { bindModules } from 'app/container/functions/bindModules';
import { IAxiosCreator, MockAxiosActionTypes } from 'app/shared/Http/types';
import { TYPES } from 'app/container/constants/TYPES';
import { MockAxiosCreator } from 'app/shared/Http/classes/axios/creators/MockAxiosCreator';
import { Container } from 'inversify';

export class MockAppContainerInitializer
	implements IAppContainerInitializerStrategy
{
	initContainer(container: Container): void {
		// MockAxios
		container
			.bind<IAxiosCreator>(TYPES.AxiosCreator)
			.to(MockAxiosCreator)
			.inSingletonScope();

		container
			.bind<MockAxiosActionTypes>(TYPES.MockAxiosActionTypes)
			.toConstantValue('OK');

		bindModules(container);
	}
}
