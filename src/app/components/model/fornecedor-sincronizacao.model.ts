import { Base } from './base.model'
import { Empresa } from './empresa.model';

export class FornecedorSincronizacao extends Base{
  public id?: number;
  public laboratorio_id?: number;
  public nome?: string;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public empresa_id?: number;
  public criado_em?: Date = new Date();
  public uuid?: string;
  public changed_by_lab_id?: number;
  public empresa?: Empresa;

  constructor(values: FornecedorSincronizacao) {
    super(values);
    Object.assign(this, values);
  }
}
