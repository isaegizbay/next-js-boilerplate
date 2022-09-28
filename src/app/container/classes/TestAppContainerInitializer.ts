import { Container } from 'inversify';
import type { IAppContainerInitializerStrategy } from "@app/container/types/IAppContainerBuilderStrategy";
import type { IAxiosCreator } from "@app/shared/Http/types/IAxiosCreator";
import { TYPES } from "@app/container/constants/TYPES";
import { MockAxiosCreator } from "@app/shared/Http/classes/axios/creators/MockAxiosCreator";
import { bindModules } from "@app/container/functions/bindModules";

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
