export class PaginationOptions {
  public limit: number;
  public pageActual: number;
  private limitMax = 100;
  private limitDefault = 50;
  constructor(pageActual: number | string = 0, limit: number | string = 50) {
    this.limit =
      parseInt(`${limit}`) > this.limitMax
        ? this.limitDefault
        : parseInt(`${limit}`);

    this.pageActual = parseInt(`${pageActual}`);
  }
}
