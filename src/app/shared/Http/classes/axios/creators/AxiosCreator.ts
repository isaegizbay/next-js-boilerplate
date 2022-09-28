import axios, { AxiosInstance } from 'axios';
import { injectable } from "inversify";
import type { IAxiosCreator } from "@app/shared/Http/types/IAxiosCreator";
import { LocalStorageHelper } from "@app/utils/classses/LocalStorageHelper";

@injectable()
export class AxiosCreator implements IAxiosCreator {
	createAxiosInstance(baseUrl: string): AxiosInstance {
		const axiosInstance = axios.create({
			baseURL: baseUrl
		});

		axiosInstance.interceptors.request.use(
			function (config) {
				// Do something before request is sent
				if (config.headers) {
					config.headers.Authorization = `Bearer ${LocalStorageHelper.userToken}`;
				}
				return config;
			},
			function (error) {
				// Do something with request error
				return Promise.reject(error);
			}
		);

		axiosInstance.interceptors.response.use(
			function (response) {
				// Any status code that lie within the range of 2xx cause this function to trigger
				// Do something with response data
				return response;
			},
			function (error) {
				// Any status codes that falls outside the range of 2xx cause this function to trigger
				// Do something with response error
				return Promise.reject(error);
			}
		);
		return axiosInstance;
	}
}
