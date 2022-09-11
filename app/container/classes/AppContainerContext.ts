import { appContainer } from 'app/container/constants';
import type { IAppContainerInitializerStrategy } from 'app/container/types';
import { AppContainerStrategies } from 'app/container/enums';

export class AppContainerContext {
	private containerInitializer;

	constructor(containerInitializer: IAppContainerInitializerStrategy) {
		this.containerInitializer = containerInitializer;
	}

	initContainer() {
		this.containerInitializer.initContainer(appContainer);
	}
}
