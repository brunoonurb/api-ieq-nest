import * as moment from 'moment';
import 'moment/locale/pt-br';

export class Data {
  public date: Date;

  constructor(date?: Date | any) {
    this.date = date ? date : new Date();
  }

  public ehValida() {
    return moment(this.date).isValid();
  }

  public getYear() {
    return moment(this.date).year();
  }

  public getMonth() {
    return moment(this.date).format('M');
  }

  public getDate() {
    return moment(this.date).date();
  }

  public getDataBr() {
    return moment(this.date).format('DD/MM/YYYY');
  }

  public getDataEua() {
    return moment(this.date).format('YYYY-MM-DD');
  }

  public getDataHoraBr() {
    return moment(this.date).format('DD/MM/YYYY HH:mm:ss');
  }

  public getDataHoraEua() {
    return moment(this.date).format('YYYY-MM-DD HH:mm:ss');
  }
  public valueOf() {
    return moment(this.date).valueOf();
  }
}

const ehValida = (data: Date) => moment(data).isValid();

const converterDataEua = (data: Date) =>
  ehValida(data) ? moment(data).format('YYYY-MM-DD') : null;

const converterDataBr = (data: Date) =>
  ehValida(data) ? moment(data).format('DD/MM/YYYY') : null;

const converterDataHoraBr = (data: Date) =>
  ehValida(data) ? moment(data).format('DD/MM/YYYY HH:mm:ss') : null;

const converterDataHoraEua = (data: Date) =>
  ehValida(data) ? moment(data).format('YYYY-MM-DD HH:mm:ss') : null;

const dataInicialMaiorDatafim = (dataInicial: Date, dataFinal: Date) =>
  moment(converterDataEua(dataFinal)).isBefore(converterDataEua(dataInicial));

export {
  ehValida,
  converterDataEua,
  converterDataBr,
  converterDataHoraEua,
  converterDataHoraBr,
  dataInicialMaiorDatafim,
};
