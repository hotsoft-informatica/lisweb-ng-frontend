export class SuperUser {
  public id?: number;
  public email?: string;
  public name?: string;
  public admin?: boolean;
  public serie?: number;

  constructor(values: SuperUser) {
    Object.assign(this, values);
  }
}
