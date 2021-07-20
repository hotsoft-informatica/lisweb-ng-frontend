export class Laboratorio {
  public id?: number;
  public nome?: string;
  public access_token?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
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
  public laboratory_domain_id?: number;
  public version_id?: number;
  public deleted?: number;
  public empresa_id?: number;
  public original_id?: number;
  public synchronized?: number;
  public domain_id?: number;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public sync_deadline?: number;
  public matrix?: number

  constructor(values: Laboratorio) {
    Object.assign(this, values);
  }
}
