export class Pessoa {
  public id?: number;
  public nome?: string;

  constructor(values: Pessoa) {
    Object.assign(this, values);
  }
}
