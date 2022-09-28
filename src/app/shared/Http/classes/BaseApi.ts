import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { inject, injectable } from 'inversify';
import { TYPES } from "@app/container/constants/TYPES";
import type { IAxiosCreator } from "@app/shared/Http/types/IAxiosCreator";

@injectable()
export class BaseApi {
	protected axios: AxiosInstance;

	constructor(@inject(TYPES.AxiosCreator) axiosCreator: IAxiosCreator) {
		this.axios = axiosCreator.createAxiosInstance('');
	}

	protected async get<T = any>(
		path: string,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.axios.get<T>(path, config);
		return response.data;
	}

	protected async post<T = any>(
		path: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.axios.post<T>(path, data, config);
		return response.data;
	}

	protected async put<T = any>(
		path: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.axios.put<T>(path, data, config);
		return response.data;
	}

	protected async patch<T = any>(
		path: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.axios.patch<T>(path, data, config);
		return response.data;
	}

	protected async delete<T = any>(
		path: string,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.axios.delete<T>(path, config);
		return response.data;
	}
}
