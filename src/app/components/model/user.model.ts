export class User {
  public id?: number;
  public email?: string;
  public name?: string;
  public admin?: boolean;

  constructor(values: User) {
    Object.assign(this, values);
  }
}
