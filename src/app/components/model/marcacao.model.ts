export class Marcacao {
  public id?: number;
  public laboratorio_id?: number;
  public nome?: string;
  public tipo?: string;
  public original_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public synchronized?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;

  constructor(values: Marcacao) {
    Object.assign(this, values);
  }
}
