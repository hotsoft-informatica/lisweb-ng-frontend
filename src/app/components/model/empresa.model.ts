export class Empresa {
  public id?: number;

  public cep?: string;
  public endereco?: string;
  public numero?: string;
  public bairro?: string;
  public cidade?: string;
  public uf?: string;
  public cod_ibge_municipio?: string;

  public telefone?: string;
  public email?: string;
  public fax?: string;

  public alvara?: string;
  public alvara_uf?: string;
  public inscricao_estadual?: string;

  public razao_social?: string;
  public nome_fantasia?: string;
  public cnpj?: string;

  constructor(values: Empresa) {
    Object.assign(this, values);
  }
}
