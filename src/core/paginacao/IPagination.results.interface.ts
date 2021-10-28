import { PaginacaoOptions } from './IPaginacao.options';

export interface IPaginacaoResults<EntityPaginacao> {
  dados: EntityPaginacao[];
  totalRegistros: number;
  paginacaoOptions: PaginacaoOptions;
}
