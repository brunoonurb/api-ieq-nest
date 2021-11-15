import { ApiResponseProperty } from '@nestjs/swagger';
import { type } from 'os';
import { IPaginationResults } from './IPagination.results.interface';

export class Pagination<EntityPaginacao> {
  @ApiResponseProperty({ type: [Object] })
  public data: EntityPaginacao[];

  @ApiResponseProperty()
  public totalRecords: number;

  @ApiResponseProperty()
  public totalPage: number;

  @ApiResponseProperty()
  public totalRecordsPage?: number;

  @ApiResponseProperty()
  public pageActual: number;

  @ApiResponseProperty()
  public previous?: number;

  @ApiResponseProperty()
  public next?: number;

  constructor(paginacaoResult: IPaginationResults<EntityPaginacao>) {
    this.data = paginacaoResult.data;
    this.totalRecords = paginacaoResult.totalRecords;
    this.totalPage = Math.ceil(
      paginacaoResult.totalRecords / paginacaoResult.pageOptions.limit,
    );
    this.totalRecordsPage = paginacaoResult.data.length;

    this.pageActual = paginacaoResult.pageOptions.pageActual;

    this.previous =
      paginacaoResult.pageOptions.pageActual <= 1
        ? 1
        : paginacaoResult.pageOptions.pageActual - 1;

    this.next =
      paginacaoResult.pageOptions.pageActual >= this.totalPage
        ? paginacaoResult.pageOptions.pageActual
        : paginacaoResult.pageOptions.pageActual + 1;
  }
}
