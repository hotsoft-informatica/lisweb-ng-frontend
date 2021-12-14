export class Query {
  public key = '';
  public value = '';
  public isNumeric = false;

  constructor(values: Query) {
    Object.assign(this, values);
  }
}

