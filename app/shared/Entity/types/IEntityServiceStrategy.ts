import { IApiResponseCallbacks } from 'app/shared/Http/types';
import { IEntityPagination, IEntityRecord } from '../types';

export interface IEntityServiceStrategy<E extends IEntityRecord, C, U> {
	fetchRecords(
		page: number,
		callbacks: IApiResponseCallbacks<IEntityPagination<E>>
	): void;

	fetchRecord(id: number, callbacks: IApiResponseCallbacks<E>): void;

	createRecord(payload: C, callbacks: IApiResponseCallbacks): void;

	updateRecord(payload: U, callbacks: IApiResponseCallbacks): void;

	deleteRecord(recordId: number, callbacks: IApiResponseCallbacks): void;
}
