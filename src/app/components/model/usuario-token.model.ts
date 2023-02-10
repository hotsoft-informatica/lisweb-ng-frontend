import { Base } from './base.model';

export class UsuarioToken{
  public id?: number;
  public nome?: string;
  public login?: string;
  public senha?: string;

  constructor(values: UsuarioToken) {
    Object.assign(this, values);
  }
}
