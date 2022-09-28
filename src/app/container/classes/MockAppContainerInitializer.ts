import type { IAppContainerInitializerStrategy } from "@app/container/types/IAppContainerBuilderStrategy";
import { TYPES } from "@app/container/constants/TYPES";
import { IAxiosCreator } from "@app/shared/Http/types/IAxiosCreator";
import { MockAxiosCreator } from "@app/shared/Http/classes/axios/creators/MockAxiosCreator";
import type { MockAxiosActionTypes } from "@app/shared/Http/types/MockAxiosActionTypes";
import { bindModules } from "@app/container/functions/bindModules";
import { Container } from "inversify";

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
