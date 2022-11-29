import { Base } from './base.model';
export class Coletor {
  public id?: number;
  public original_id?: number;
  public laboratorio_id?: number;
  public usuario_id?: number;
  public sexo?: string;
  public codigo_inicio?: number;
  public codigo_fim?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;

  constructor(values: Coletor) {
    Object.assign(this, values);
  }
}
