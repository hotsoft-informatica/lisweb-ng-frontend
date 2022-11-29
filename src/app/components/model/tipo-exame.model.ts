import { Base } from './base.model';
import { TipoInstrumento } from 'src/app/components/model/tipo-instrumento.model';

export class TipoExame extends Base{
  public cod_exame?: string;
  public coletor_mesmo_sexo?: string;
  public descricao?: string;
  public historico_grafico?: string;
  public imprime_historico?: string;
  public multi_amostra?: string;
  public publica_resultado?: string;
  public regua_referencial?: string;
  public resultado_controlado?: string;
  public resultado_grafico?: string;
  public resultado_parcial?: string;
  public sexo?: string;
  public texto_mapa?: string;
  public tipo_historico?: string;
  public tipo_resultado?: string;

  public bancada_id?: number;
  public ordem_laudo?: number;

  public tipoInstrumento?: TipoInstrumento;

  constructor(values: TipoExame) {
    super(values);
    Object.assign(this, values);
  }
}
