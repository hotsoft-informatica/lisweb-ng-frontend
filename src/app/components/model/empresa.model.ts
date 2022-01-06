export class Empresa {
  public i?: number;
  public original_id?: number;
  public razao_social?: string;
  public nome_fantasia?: string;
  public cnpj?: string;
  public inscricao_estadual?: string;
  public endereco?: string;
  public bairr?: string;
  public cep?: string;
  public cidade?: string;
  public uf?: string;
  public telefone?: string;
  public fax?: string;
  public nome_contato?: string;
  public email?: string;
  public cod_ibge_municipio?: string;
  public tipo_logradouro?: string;
  public numero?: string;
  public laboratorio_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public alvara?: string;
  public alvara_uf?: string;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;

  constructor(values: Empresa) {
    Object.assign(this, values);
  }
}
