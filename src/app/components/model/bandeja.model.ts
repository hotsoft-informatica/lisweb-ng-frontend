export class Bandeja {
  public id?: number;
  public original_id?: number;
  public laboratorio_id?: number;
  public numero_bandeja?: number;
  public tamanho_x?: number;
  public tamanho_y?: number;
  public data_criacao?: Date = new Date();
  public data_descarte?: Date = new Date();
  public permanente?: string;
  public usuario_descarte_id?: number;
  public status?: string;
  public local?: string;
  public dias_descarte?: number;
  public usuario_criacao_id?: number;
  public usuario_fechamento_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public synchronized?: boolean;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;

  constructor(values: Bandeja) {
    Object.assign(this, values);
  }
}
