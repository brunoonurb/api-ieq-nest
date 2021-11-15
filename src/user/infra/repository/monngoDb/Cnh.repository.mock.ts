import { Injectable } from '@nestjs/common';
import { CnhIncluirCommand } from 'src/cnh/dominio/command/CnhIncluir.command';
import { Cnh } from 'src/cnh/dominio/entity/Cnh.entity';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import { Pagination } from 'src/core/pagination/Pagination';
import { Data } from 'src/core/utils/Data';
import { ICnhRepository } from './ICnh.interface';

@Injectable()
export class CnhRepositoryMock implements ICnhRepository {
  listarComPaginacao(
    idCliente: number,
    pageOptions: PaginationOptions,
  ): Promise<[Cnh[], number]> {
    throw new Error('Method not implemented.');
  }
  private cnhs: Cnh[] = [
    {
      id: 1,
      dataCadastro: new Data('2021-08-27 05:55:46.00').date,
      idCliente: 91,
      nome: 'bruno',
      rg: '00000',
      cpf: '09204387920',
      nacionalidade: 'brasil',
      profissao: 'dev',
      estadoCivil: 'casado',
      dataNascimento: new Data('2021-05-01').date,
      numeroRegistro: '11111',
      dataValidade: new Data('2021-05-01').date,
      dataPrimeiraHab: new Data('2021-05-01').date,
      uf: 'PR',
      cep: '000',
      endereco: 'rua',
      endNumero: 'numero',
      endBairro: 'bairro',
      endCidade: 'Curitiba',
      endUf: 'pr',
      email: 'bruno@pedroso.com',
      gestao: false,
      dataHoraUltimaConsulta: null,
      exclusao: false,
      dataExclusao: null,
      senha: null,
    },
    {
      id: 2,
      dataCadastro: new Data('2021-08-27 05:55:46.00').date,
      idCliente: 91,
      nome: 'bruno2',
      rg: '00000',
      cpf: '33389156089',
      nacionalidade: 'brasil',
      profissao: 'dev',
      estadoCivil: 'casado',
      dataNascimento: new Data('2021-05-01').date,
      numeroRegistro: '11111',
      dataValidade: new Data('2021-05-01').date,
      dataPrimeiraHab: new Data('2021-05-01').date,
      uf: 'PR',
      cep: '000',
      endereco: 'rua',
      endNumero: 'numero',
      endBairro: 'bairro',
      endCidade: 'Curitiba',
      endUf: 'pr',
      email: 'bruno@pedroso.com',
      gestao: false,
      dataHoraUltimaConsulta: null,
      exclusao: false,
      dataExclusao: null,
      senha: null,
    },
  ];
  private cnhRetorno = {
    idCliente: 91,
    nome: 'nomeOb',
    rg: '012123',
    cpf: '32637478004',
    nacionalidade: 'Brasil',
    profissao: 'dev',
    estadoCivil: 'casado',
    dataNascimento: new Data('2025-05-05 00:00:00.00').date,
    numeroRegistro: '123456',
    dataValidade: new Data('2025-05-01 00:00:00.00').date,
    dataPrimeiraHab: new Data('2014-05-01 00:00:00.00').date,
    uf: 'PR',
    cep: '82940310',
    endereco: 'rua',
    endNumero: '12',
    endBairro: 'cajuru',
    endCidade: 'Curitiba',
    endUf: 'Pr',
    email: 'email@email.com',
  };
  async listar(idCliente: number): Promise<boolean | Cnh[]> {
    const cnhs: Cnh[] = this.cnhs;
    return cnhs;
  }
  async incluir(cnh: CnhIncluirCommand): Promise<any> {
    const cnhRetorno = this.cnhRetorno;
    const resultado = {
      ...cnhRetorno,
      id: 1,
    };
    return resultado;
  }
  async existeCnh(cpf: string, idCliente: number): Promise<Cnh | Cnh[]> {
    const cnhs = this.cnhs.filter(
      (cnh) => cpf === cnh.cpf && idCliente === cnh.idCliente,
    );

    return cnhs.length > 0 ? cnhs : undefined;
  }
  async atualizar(id: number, cnh: CnhIncluirCommand): Promise<any> {
    return this.cnhRetorno;
  }
  async buscar(id: number): Promise<Cnh> {
    const cnhs = this.cnhs.filter((cnh) => id === cnh.id);

    return cnhs.length > 0 ? cnhs[0] : undefined;
  }
  async excluir(id: number): Promise<boolean> {
    return true;
  }
  async habilitarDesabilitarConsultaMensal(
    id: number,
    ativar: boolean,
  ): Promise<boolean> {
    return true;
  }
  async buscarComIdsCnh(idsCnh: number[], idCliente: number): Promise<Cnh[]> {
    throw new Error('Method not implemented.');
  }
}
