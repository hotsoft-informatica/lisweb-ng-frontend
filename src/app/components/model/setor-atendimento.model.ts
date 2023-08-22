import { Base } from './base.model'
import { LocalDeAtendimento } from './local-de-atendimento.model';

export class SetorAtendimento extends Base{
  public id?: number;
  public laboratorio_id?: number;
  public nome?: string;
  public intervalo?: number;
  public maximo_atendimento?: number;
  public local_atendimento_id?: number;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public uuid?: string
  public local_atendimento?: LocalDeAtendimento;

  constructor(values: SetorAtendimento) {
    super(values);
    Object.assign(this, values);
  }
}














