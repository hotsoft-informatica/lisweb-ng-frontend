import { Base } from './base.model';
export class Query extends Base{
  public key = '';
  public value = '';
  public isNumeric = false;

  constructor(values: Query) {
    super(values);
    Object.assign(this, values);
  }
}

