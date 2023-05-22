
import { Base } from './base.model';
import { Laboratorio } from './laboratorio.model';

export class OperadoraTelefonia extends Base {
  public id?: number;
  public original_id?: number;
  public descricao?: string;
  public codigo_interurbano?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public uuid?: string;
  public laboratorios?: Laboratorio;

  constructor(values: OperadoraTelefonia) {
    super(values)
    Object.assign(this, values);
  }
}
