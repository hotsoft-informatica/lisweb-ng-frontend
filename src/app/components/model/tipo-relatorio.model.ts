import { Base } from './base.model';

export class TipoRelatorio extends Base{
  public id?: number;
  public laboratorio_id?: number;
  public nome?: string;
  public descricao?: string;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public uuid?: string;

  constructor(values: TipoRelatorio) {
    super(values);
    Object.assign(this, values);
  }
}
