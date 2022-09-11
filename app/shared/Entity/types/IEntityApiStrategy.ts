import type {
	IEntityPagination,
	IEntityRecord
} from 'app/shared/Entity/types/';

export interface IEntityApiStrategy<E extends IEntityRecord, C, U> {
	fetchEntityList(page: number): Promise<IEntityPagination<E>>;

	fetchEntity(payload: unknown): Promise<E>;

	createEntity(payload: C): Promise<{ message: string }>;

	updateEntity(payload: U): Promise<{ message: string }>;

	deleteEntity(id: number): Promise<{ message: string }>;
}
