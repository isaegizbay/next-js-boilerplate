import { IApiResponseCallbacks } from 'app/shared/Http/types';
import { IEntityPagination, IEntityRecord } from '../types';

export interface IEntityServiceStrategy<E extends IEntityRecord, C, U> {
	fetchRecords(
		page: number,
		callbacks: IApiResponseCallbacks<IEntityPagination<E>>
	): Promise<void>;

	fetchRecord(): Promise<E>;

	createRecord(
		payload: C,
		callbacks: IApiResponseCallbacks<{ message: string }>
	): Promise<void>;

	updateRecord(
		payload: U,
		callbacks: IApiResponseCallbacks<{ message: string }>
	): Promise<void>;

	deleteRecord(
		recordId: number,
		callbacks: IApiResponseCallbacks<{ message: string }>
	): Promise<void>;
}
