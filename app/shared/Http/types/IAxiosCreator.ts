import { AxiosInstance } from 'axios';

export interface IAxiosCreator {
	createAxiosInstance(baseUrl: string): AxiosInstance;
}
