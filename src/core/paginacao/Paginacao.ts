import { IPaginacaoResults } from './IPagination.results.interface';

export class Paginacao<EntityPaginacao> {
  public dados: EntityPaginacao[];
  public totalRegistros: number;
  public totalPagina: number;
  public totalRegistrosPagina?: number;
  public paginaAtual: number;
  public anterior?: number;
  public proximo?: number;

  constructor(paginacaoResult: IPaginacaoResults<EntityPaginacao>) {
    this.dados = paginacaoResult.dados;
    this.totalRegistros = paginacaoResult.totalRegistros;
    this.totalPagina = Math.ceil(
      paginacaoResult.totalRegistros / paginacaoResult.paginacaoOptions.limite,
    );
    this.totalRegistrosPagina = paginacaoResult.dados.length;

    this.paginaAtual = paginacaoResult.paginacaoOptions.paginaAtual;

    this.anterior =
      paginacaoResult.paginacaoOptions.paginaAtual <= 1
        ? 1
        : paginacaoResult.paginacaoOptions.paginaAtual - 1;

    this.proximo =
      paginacaoResult.paginacaoOptions.paginaAtual >= this.totalPagina
        ? paginacaoResult.paginacaoOptions.paginaAtual
        : paginacaoResult.paginacaoOptions.paginaAtual + 1;
  }
}
