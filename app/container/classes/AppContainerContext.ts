import { appContainer } from 'app/container/constants';
import type { IAppContainerInitializerStrategy } from 'app/container/types';

export class AppContainerContext {
	private containerInitializer;

	constructor(containerInitializer: IAppContainerInitializerStrategy) {
		this.containerInitializer = containerInitializer;
	}

	initContainer() {
		this.containerInitializer.initContainer(appContainer);
	}
}
