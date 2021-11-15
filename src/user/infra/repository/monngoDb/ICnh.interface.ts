import { CnhIncluirCommand } from 'src/cnh/dominio/command/CnhIncluir.command';
import { Cnh } from 'src/cnh/dominio/entity/Cnh.entity';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import { Pagination } from 'src/core/pagination/Pagination';
import { UpdateResult } from 'typeorm';

export interface ICnhRepository {
  listarComPaginacao(
    idCliente: number,
    pageOptions: PaginationOptions,
  ): Promise<[Cnh[], number]>;
  listar(idCliente: number): Promise<Cnh[] | boolean>;
  incluir(cnh: CnhIncluirCommand): Promise<boolean | Cnh>;
  existeCnh(cpf: string, idCliente: number): Promise<Cnh | Cnh[]>;
  atualizar(
    id: number,
    cnh: CnhIncluirCommand,
  ): Promise<UpdateResult | boolean>;
  buscar(id: number, idCliente: number): Promise<Cnh>;
  excluir(id: number): Promise<UpdateResult | boolean>;
  habilitarDesabilitarConsultaMensal(
    id: number,
    ativar: boolean,
  ): Promise<UpdateResult | boolean>;

  buscarComIdsCnh(idsCnh: number[], idCliente: number): Promise<Cnh[]>;
}
