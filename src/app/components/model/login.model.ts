export class Login {
  public email?: string;
  public password?: string;
}

export class UserLogin {
  public user: Login = {};

  constructor(values: UserLogin) {
    Object.assign(this, values);
  }
}

export class SuperUserLogin {
  public super_user: Login = {};

  constructor(values: SuperUserLogin) {
    Object.assign(this, values);
  }
}
