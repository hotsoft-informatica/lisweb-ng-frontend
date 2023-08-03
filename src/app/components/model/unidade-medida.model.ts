import { Base } from './base.model';

export class UnidadeMedida extends Base{
  public id?: number;
  public nome?: string;
  public sigla?: string;
  public descricao?: string;
  public laboratorio_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public uuid?: string;

  constructor(values: UnidadeMedida) {
    super(values);
    Object.assign(this, values);
  }
}
