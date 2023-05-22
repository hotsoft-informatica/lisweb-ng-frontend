import { Recurso } from './recurso.model';
import { BaseRaw } from './base-raw.model';

export class Laboratorio extends BaseRaw{
  public nome?: string;
  public access_token?: string;
  public version_counter?: number;
  public serie?: number;
  public next_numero_atendimento?: number;
  public next_numero_orcamento?: number;
  public status?: string;
  public next_numero_baixa?: number;
  public producao_estoque?: number;
  public producao_financeiro?: number;
  public sincronizar?: number;
  public token_nfe?: string;
  public url_nfe?: string;
  public recursos?: Recurso;
  public empresa_id?: number;
  public domain_id?: number;
  public sync_deadline?: number;
  public matrix?: number

  // TODO: Mover para interface
  public laboratory_domain_id?: number;

  constructor(values: Laboratorio) {
    super(values);
    Object.assign(this, values);
  }
}
