import { IEntityRecord } from "@app/shared/Entity/types/IEntityRecord";

export interface IEntityPagination<T extends IEntityRecord> {
	records: T[];
	currentPage: number;
	totalPagesCount: number;
	recordsPerPage: number;
	totalRecordsCount: number;
}
