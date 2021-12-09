export class ConsultaAmostra {
  public id?: number;
  public original_id?: number;
  public laboratorio_id?: number;
  public exame_id?: number;
  public amostra_id?: number;
  public num_multi_amostra?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public agrupamento_amostra_id?: number;
  public fracionamento_amostra_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number

  constructor(values: ConsultaAmostra) {
    Object.assign(this, values);
  }
}
