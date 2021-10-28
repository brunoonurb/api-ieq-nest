export class PaginacaoOptions {
  public limite: number;
  public paginaAtual: number;
  private limiteMaximo = 100;
  private limitePadrao = 50;
  constructor(paginaAtual: number | string = 0, limite: number | string = 50) {
    this.limite =
      parseInt(`${limite}`) > this.limiteMaximo
        ? this.limitePadrao
        : parseInt(`${limite}`);

    this.paginaAtual = parseInt(`${paginaAtual}`);
  }

  getLimite(): number {
    return this.limite;
  }

  getPaginaAtual(): number {
    return this.paginaAtual - 1;
  }
}
