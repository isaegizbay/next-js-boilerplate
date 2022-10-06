import type { IEntityRecord } from "@app/shared/Entity/types/IEntityRecord";
import type { IApiResponseCallbacks } from "@app/shared/Http/types/IApiResponseCallbacks";
import type { IEntityPagination } from "@app/shared/Entity/types/IEntityPagination";

export interface IEntityServiceStrategy<E extends IEntityRecord, C, U> {
	fetchRecords(
		page: number,
		callbacks: IApiResponseCallbacks<IEntityPagination<E>>
	): Promise<void>;

	fetchRecord(id: number, callbacks: IApiResponseCallbacks<E>): Promise<void>;

	createRecord(payload: C, callbacks: IApiResponseCallbacks): Promise<void>;

	updateRecord(payload: U, callbacks: IApiResponseCallbacks): Promise<void>;

	deleteRecord(recordId: number, callbacks: IApiResponseCallbacks): Promise<void>;
}
