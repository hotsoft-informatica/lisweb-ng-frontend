import { Base } from './base.model'
import { Operadora } from "./operadora.model";

export class Empresa extends Base{
  public alvara_uf?: string;
  public alvara?: string;
  public bairro?: string;
  public cep?: string;
  public changed_by_lab_id?: number;
  public cidade?: string;
  public cnpj?: string;
  public cod_ibge_municipio?: string;
  public email?: string;
  public endereco?: string;
  public fax?: string;
  public inscricao_estadual?: string;
  public laboratorio_id?: number;
  public laboratory_domain_id?: number;
  public nome_contato?: string;
  public nome_fantasia?: string;
  public numero?: string;
  public operadora?: Operadora;
  public razao_social?: string;
  public telefone?: string;
  public tipo_logradouro?: string;
  public uf?: string;

  constructor(values: Empresa) {
    super(values);
    Object.assign(this, values);
  }
}
