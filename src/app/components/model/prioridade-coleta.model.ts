import { Base } from './base.model';

export class PrioridadeColeta extends Base{
  public id?: number;
  public laboratorio_id?: number;
  public original_id?: number;
  public descricao?: string;
  public cor?: number;
  public prioridade?: number;
  public cor_fonte?: number;
  public tipo_prioridade?: string;
  public prioridade_padrao_coleta?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public uuid?: string

  constructor(values: PrioridadeColeta) {
    super(values)
    Object.assign(this, values);
  }
}
