import type { IEntityRecord } from "@app/shared/Entity/types/IEntityRecord";
import type { IEntityPagination } from "@app/shared/Entity/types/IEntityPagination";

export interface IEntityApiStrategy<E extends IEntityRecord, C, U> {
	fetchEntityList(page: number): Promise<IEntityPagination<E>>;

	fetchEntity(payload: unknown): Promise<E>;

	createEntity(payload: C): Promise<{ message: string }>;

	updateEntity(payload: U): Promise<{ message: string }>;

	deleteEntity(id: number): Promise<{ message: string }>;
}
