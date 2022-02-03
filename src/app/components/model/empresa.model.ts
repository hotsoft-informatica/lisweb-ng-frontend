export class Empresa {
  public id?: string;
  public empresa_id?: string;

  public cep?: string;
  public endereco?: string;
  public numero?: string;
  public bairro?: string;
  public cidade?: string;
  public uf?: string;

  public razao_social?: string;
  public nome_fantasia?: string;
  public razao_social?: string;
  public cnpj?: string;

  constructor(values: Empresa) {
    Object.assign(this, values);
  }
}
