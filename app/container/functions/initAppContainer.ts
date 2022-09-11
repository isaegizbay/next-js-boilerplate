import {
	AppContainerContext,
	AppContainerInitializer
} from 'app/container/classes';
import { MockAppContainerInitializer } from 'app/container/classes/MockAppContainerInitializer';
import { AppContainerStrategies } from 'app/container/enums';
import { IAppContainerInitializerStrategy } from 'app/container/types';
import { TestAppContainerInitializer } from 'app/container/classes/TestAppContainerInitializer';
import { appContainer } from 'app/container/constants';

export async function initAppContainer(strategy: AppContainerStrategies) {
	appContainer.unbindAll();
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
