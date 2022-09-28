import { appContainer } from "@app/container/constants/appContainer";
import { AppContainerStrategies } from "@app/container/enums/AppContainerStrategies";
import type { IAppContainerInitializerStrategy } from "@app/container/types/IAppContainerBuilderStrategy";
import { AppContainerInitializer } from "@app/container/classes/AppContainerInitializer";
import { MockAppContainerInitializer } from "@app/container/classes/MockAppContainerInitializer";
import { TestAppContainerInitializer } from "@app/container/classes/TestAppContainerInitializer";
import { AppContainerContext } from "@app/container/classes/AppContainerContext";

export async function initAppContainer(strategy: AppContainerStrategies) {
	await appContainer.unbindAllAsync();
	let initializer: IAppContainerInitializerStrategy;
	switch (strategy) {
		case AppContainerStrategies.DEFAULT:
			initializer = new AppContainerInitializer();
			break;
		case AppContainerStrategies.MOCK:
			initializer = new MockAppContainerInitializer();
			break;
		case AppContainerStrategies.TEST:
			initializer = new TestAppContainerInitializer();
			break;
	}

	new AppContainerContext(initializer).initContainer();
}
