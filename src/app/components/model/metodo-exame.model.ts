export class MetodoExame {
  public id?: number;
  public laboratorio_id?: number;
  public descricao?: string;
  public bibliografia?: string;
  public original_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number

  constructor(values: MetodoExame) {
    Object.assign(this, values);
  }
}
