export class UserLogin {
  public email?: string;
  public password?: string;
}

export class Login {
  public user: UserLogin = {};

  constructor(values: Login) {
    Object.assign(this, values);
  }
}
