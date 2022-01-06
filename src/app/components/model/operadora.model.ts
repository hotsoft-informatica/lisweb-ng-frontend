import { Paciente } from './paciente.model';
export class Operadora {
  public endpoint?= 'http://localhost:3010/operadoras'
  public id?: number;
  public laboratorio_id?: number;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public empresa_id?: number;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public belongs_to?= [Paciente]

  constructor(values: Operadora) {
    Object.assign(this, values);
  }
}
