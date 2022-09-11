import { IEntityRecord } from '../types/';

export interface IEntityPagination<T extends IEntityRecord> {
	records: T[];
	currentPage: number;
	totalPagesCount: number;
	recordsPerPage: number;
	totalRecordsCount: number;
}
