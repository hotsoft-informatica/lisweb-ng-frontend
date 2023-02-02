export class User {
  public id?: number;
  public email?: string;
  public name?: string;
  public admin?: boolean;
  public usuarios_ids?: number;

  constructor(values: User) {
    Object.assign(this, values);
  }
}
