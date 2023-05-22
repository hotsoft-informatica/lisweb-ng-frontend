import { Base } from './base.model';

export class Amostra extends Base {
  public amostra_original_id?: number;
  public bancada_id?: number;
  public coletor_id?: number;
  public instrumento_id?: number;
  public laboratorio_apoio_id?: number;
  public local_atendimento_coleta_id?: number;
  public lote_amostras_id?: number;
  public material_biologico_id?: number;
  public meio_coleta_id?: number;
  public num_amostra?: number;
  public posicao_lote?: number;
  public requisicao_id?: number;
  public tipo_instrumento_id?: number;
  public usuario_coleta_id?: number;
  public volume_coletado?: number;
  public volume_necessario?: number;

  public cod_barra_apoio?: string;
  public coleta_automatica?: string;
  public coleta_externa?: string;
  public etiqueta_apoio?: string;
  public status?: string;
  public tipo_coleta?: string;
  public triado_automaticamente?: string;
  public unidade?: string;

  public data_hora_coleta?: Date = new Date();
  public data_hora_previsao_coleta?: Date = new Date();
  public data_hora_triagem?: Date = new Date();
  public previsao_critica_coleta?: Date = new Date();
  public previsao_normal_coleta?: Date = new Date();

  constructor(values: Amostra) {
    super(values);
    Object.assign(this, values);
  }
}
