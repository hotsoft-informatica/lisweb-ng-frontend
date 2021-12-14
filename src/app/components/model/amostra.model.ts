export class Amostra {
  public id?: number;
  public original_id?: number;
  public laboratorio_id?: number;
  public num_amostra?: number;
  public material_biologico_id?: number;
  public laboratorio_apoio_id?: number;
  public bancada_id?: number;
  public lote_amostras_id?: number;
  public requisicao_id?: number;
  public meio_coleta_id?: number;
  public unidade?: string;
  public tipo_instrumento_id?: number;
  public volume_necessario?: number;
  public volume_coletado?: number;
  public data_hora_coleta?: Date = new Date();
  public status?: string;
  public usuario_coleta_id?: number;
  public local_atendimento_coleta_id?: number;
  public amostra_original_id?: number;
  public posicao_lote?: number;
  public triado_automaticamente?: string;
  public coleta_automatica?: string;
  public cod_barra_apoio?: string;
  public etiqueta_apoio?: string;
  public instrumento_id?: number;
  public tipo_coleta?: string;
  public coleta_externa?: string;
  public coletor_id?: number;
  public data_hora_previsao_coleta?: Date = new Date();
  public previsao_normal_coleta?: Date = new Date();
  public previsao_critica_coleta?: Date = new Date();
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public data_hora_triagem?: Date = new Date();
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number

  constructor(values: Amostra) {
    Object.assign(this, values);
  }
}
