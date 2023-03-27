import { Base } from './base.model';

let randomString = (length: number = 8) => {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';

  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

export class User extends Base {
  public email?: string;
  public name?: string;
  public admin?: boolean;
  public usuarios_ids?: number;
  public password?: string = randomString(8);
  public serie?: number;

  constructor(values: User) {
    super(values);
    Object.assign(this, values);
  }
}
