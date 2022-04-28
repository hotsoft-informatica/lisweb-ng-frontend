export class UsuarioToken{
  public id?: number;
  public nome?: string;

  constructor(values: UsuarioToken) {
    Object.assign(this, values);
  }
}
