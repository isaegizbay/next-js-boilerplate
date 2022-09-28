import type { IAppContainerInitializerStrategy } from "@app/container/types/IAppContainerBuilderStrategy";
import { appContainer } from "@app/container/constants/appContainer";

export class AppContainerContext {
	private containerInitializer;

	constructor(containerInitializer: IAppContainerInitializerStrategy) {
		this.containerInitializer = containerInitializer;
	}

	initContainer() {
		this.containerInitializer.initContainer(appContainer);
	}
}
