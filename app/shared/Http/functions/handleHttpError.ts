import { AxiosError } from 'axios';
import { IApiErrorHandleCallbacks } from 'app/shared/Http/types';

export function handleHttpError(
	error: unknown,
	callbacks: IApiErrorHandleCallbacks
) {
	if ((error as any)?.isAxiosError) {
		const axiosError = error as AxiosError;
		const message = axiosError.message;
		const status = axiosError.response?.status;
		const code = axiosError.code;

		if (status) {
			if (status >= 400 && status <= 499) {
				callbacks.handleClientError(axiosError);
				return;
			} else if (status >= 500 && status <= 599) {
				callbacks.handleServerError(axiosError);
				return;
			}
		} else if (message === 'Network Error') {
			callbacks.handleNetworkError(axiosError);
			return;
		} else if (code === 'ECONNABORTED') {
			callbacks.handleTimeoutError(axiosError);
			return;
		}
	}

	callbacks.handleUnexpectedError(error as AxiosError);
}
