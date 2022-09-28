import { AxiosError } from 'axios';

export interface IApiErrorHandleCallbacks {
	handleNetworkError(error: AxiosError): void;
	handleServerError(error: AxiosError): void;
	handleTimeoutError(error: AxiosError): void;
	handleClientError(error: AxiosError): void;
	handleUnexpectedError(error: AxiosError): void;
}
