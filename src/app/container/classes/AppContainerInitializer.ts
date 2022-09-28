import { Container } from 'inversify';
import type { IAppContainerInitializerStrategy } from "@app/container/types/IAppContainerBuilderStrategy";
import { TYPES } from "@app/container/constants/TYPES";
import type { IAxiosCreator } from "@app/shared/Http/types/IAxiosCreator";
import { AxiosCreator } from "@app/shared/Http/classes/axios/creators/AxiosCreator";
import { bindModules } from "@app/container/functions/bindModules";

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
