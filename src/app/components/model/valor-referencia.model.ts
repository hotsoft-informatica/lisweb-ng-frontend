import { AtributoExame } from "./atributo-exame.model";
import { Base } from './base.model';
import { VersaoExame } from "./versao-exame.model";

export class ValorReferencia extends Base{
  public idade_maxima?: string;
  public idade_minima?: string;
  public sexo?: string;
  public texto?: string;

  public atributo_exame_id?: number;
  public val_maximo_absurdo?: number;
  public val_maximo_critico?: number;
  public val_maximo?: number;
  public val_minimo_absurdo?: number;
  public val_minimo_critico?: number;
  public val_minimo?: number;
  public versao_exame_id?: number;

  public atributoExame?: AtributoExame;
  public versaoExame?: VersaoExame;

  constructor(values: ValorReferencia) {
    super(values);
    Object.assign(this, values);
  }
}
