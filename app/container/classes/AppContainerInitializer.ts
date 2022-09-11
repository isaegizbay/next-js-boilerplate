import { Container } from 'inversify';
import type { IAppContainerInitializerStrategy } from 'app/container/types';
import type { IAxiosCreator } from 'app/shared/Http/types/';
import { AxiosCreator } from 'app/shared/Http/classes/axios/creators/AxiosCreator';
import { bindModules } from 'app/container/functions/bindModules';
import { TYPES } from 'app/container/constants/TYPES';

export class AppContainerInitializer
	implements IAppContainerInitializerStrategy
{
	initContainer(container: Container) {
		// Axios
		container
			.bind<IAxiosCreator>(TYPES.AxiosCreator)
			.to(AxiosCreator)
			.inSingletonScope();

		bindModules(container);
	}
}
