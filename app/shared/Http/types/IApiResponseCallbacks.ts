import type { IApiErrorHandleCallbacks } from "app/shared/Http/types";

export interface IApiResponseCallbacks<E = { message: string }>
	extends IApiErrorHandleCallbacks {
	handleSuccess(data: E): void;
}
