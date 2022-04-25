import { UsuarioToken } from "./usuario-token.model";

export class Token{
  public token?: string;
  public timeout?: Date = new Date();
  public usuario?: UsuarioToken = new UsuarioToken({});

  constructor(values: Token) {
    Object.assign(this, values);
  }
}
