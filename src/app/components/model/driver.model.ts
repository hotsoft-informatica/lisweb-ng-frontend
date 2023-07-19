import { Base } from './base.model'

export class Driver extends Base{
  public id?: number;
  public laboratorio_id?: number;
  public nome?: string;
  public arquivo?: string;
  public autorizacao?: string;
  public data_validade?: Date = new Date();
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public uuid?: string

  constructor(values: Driver) {
    super(values);
    Object.assign(this, values);
  }
}
