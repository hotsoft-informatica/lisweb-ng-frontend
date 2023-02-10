import { Base } from './base.model';

export class Bancada extends Base{
  public cor_fonte?: number;
  public cor?: number;
  public relatorio_id?: number;

  public cod_area?: string;
  public habilita_triagem_rapida?: string;
  public nome?: string;

  constructor(values: Bancada) {
    super(values);
    Object.assign(this, values);
  }
}
