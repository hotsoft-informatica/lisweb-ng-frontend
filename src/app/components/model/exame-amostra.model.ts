import { VersaoExame } from './versao-exame.model';
import { Amostra } from "./amostra.model";
import { Exame } from "./exame.model";
import { TipoExame } from "./tipo-exame.model";
import { Base } from './base.model'

export class ExameAmostra extends Base{
  public exame_id?: number;
  public amostra_id?: number;
  public num_multi_amostra?: number;
  public agrupamento_amostra_id?: number;
  public fracionamento_amostra_id?: number;
  public exame?: Exame;
  public amostra?: Amostra;
  public tipo_exame?: TipoExame;
  public versao_exame?: VersaoExame;

  constructor(values: ExameAmostra) {
    super(values);
    Object.assign(this, values);
  }
}
