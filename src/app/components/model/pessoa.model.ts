import { Base } from './base.model';

export class Pessoa extends Base{
  public nome?: string;

  constructor(values: Pessoa) {
    super(values);
    Object.assign(this, values);
  }
}
