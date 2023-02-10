import { Base } from './base.model'

export class Dominio extends Base{
  public descricao?: string;
  public num_ordem?: number;

  constructor(values: Dominio) {
    super(values);
    Object.assign(this, values);
  }
}
