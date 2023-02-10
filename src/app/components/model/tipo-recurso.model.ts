import { Base } from './base.model';

export class TipoRecurso extends Base{
  public descricao?: string;

  constructor(values: TipoRecurso) {
    super(values);
    Object.assign(this, values);
  }
}
