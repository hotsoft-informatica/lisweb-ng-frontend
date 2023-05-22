import { Base } from './base.model';

export class HibridoClientError extends Base {
  public data_hora?: Date = new Date();
  public data_hora_lt?: Date = new Date();
  public data_hora_gt?: Date = new Date();
  public http_action?: string;
  public tabela?: string;
  public exception_class?: string;
  public stream?: string;
  public mensagem?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public laboratorio_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public version_id?: number;
  public original_id?: number;
  public record_id?: number;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public uuid?: string;

  constructor(values: HibridoClientError) {
    super(values)
    Object.assign(this, values);
  }
}
