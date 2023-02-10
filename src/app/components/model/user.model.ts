import { Base } from './base.model';
export class User extends Base {
  public email?: string;
  public name?: string;
  public admin?: boolean;
  public usuarios_ids?: number;

  constructor(values: User) {
    super(values);
    Object.assign(this, values);
  }
}
