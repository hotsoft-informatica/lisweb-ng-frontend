import { Base } from './base.model';

export class LoteAmostras extends Base{
  public agrupamento_amostra_id?: number;
  public bancada_id?: number;
  public fracionamento_amostra_id?: number;
  public laboratorio_apoio_id?: number;
  public laboratorio_id?: number;
  public num_lote?: number;
  public tipo_instrumento_id?: number;
  public usuario_id?: number;

  public exportado_na_triagem?: string;
  public observacoes?: string;
  public status?: string;
  public tipo_lote?: string;
  public urgente?: string;

  public data_hora_criacao?: Date = new Date();

  constructor(values: LoteAmostras) {
    super(values);
    Object.assign(this, values);
  }
}
