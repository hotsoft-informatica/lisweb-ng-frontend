export class Query {
  public key: string = '';
  public value: string = '';

  constructor(values: Query) {
    Object.assign(this, values);
  }
}
