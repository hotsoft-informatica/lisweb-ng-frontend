export class LoteAmostras {
  public id?: number;
  public original_id?: number;
  public laboratorio_apoio_id?: number;
  public laboratorio_id?: number;
  public tipo_lote?: string;
  public data_hora_criacao?: Date = new Date();
  public status?: string;
  public usuario_id?: number;
  public observacoes?: string;
  public tipo_instrumento_id?: number;
  public num_lote?: number;
  public urgente?: string;
  public bancada_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public exportado_na_triagem?: string;
  public version_id?: number;
  public agrupamento_amostra_id?: number;
  public fracionamento_amostra_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;

  constructor(values: LoteAmostras) {
    Object.assign(this, values);
  }
}
