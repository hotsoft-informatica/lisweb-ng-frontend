import { Base } from './base.model';

export class Marcacao extends Base{
  public nome?: string;
  public tipo?: string;

  constructor(values: Marcacao) {
    super(values);
    Object.assign(this, values);
  }
}
