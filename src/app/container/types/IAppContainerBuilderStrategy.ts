import { Container } from 'inversify';

export interface IAppContainerInitializerStrategy {
	initContainer(container: Container): void;
}
