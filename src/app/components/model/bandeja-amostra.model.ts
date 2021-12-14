export class BandejaAmostra {
  public id?: number;
  public original_id?: number;
  public laboratorio_id?: number;
  public bandeja_id?: number;
  public posicao_x?: number;
  public posicao_y?: number;
  public status?: string;
  public usuario_retirada_id?: number;
  public usuario_arquivamento_id?: number;
  public data_retirada?: Date = new Date();
  public data_arquivamento?: Date = new Date();
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public amostra_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number

  constructor(values: BandejaAmostra) {
    Object.assign(this, values);
  }
}
