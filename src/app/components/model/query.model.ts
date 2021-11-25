export class Query {
  public key: string = '';
  public value: string = '';
  public isNumeric: boolean = false;

  constructor(values: Query) {
    Object.assign(this, values);
  }
}
