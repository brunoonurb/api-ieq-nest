import { PaginationOptions } from './Pagination.options';

export interface IPaginationResults<EntityPagination> {
  data: EntityPagination[];
  totalRecords: number;
  pageOptions: PaginationOptions;
}
