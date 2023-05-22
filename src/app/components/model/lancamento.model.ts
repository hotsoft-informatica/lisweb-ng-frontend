import { Pessoa } from './pessoa.model';
import { Base } from './base.model'

export class Lancamento extends Base{
  public tipo?: string;
  public valor?: number;
  public data_vencimento?: string;
  public descricao?: string;
  public status?: string;
  public numero_documento?: string;
  public natureza?: string;
  public data_emissao?: string;
  public quantidade_parcelas?: string;

  public pessoa_id?: string;
  public unidade_atendimento_id?: string;
  public conta_contabil_id?: string;
  public conta_id?: number;
  public pessoa?: Pessoa;

  // TODO: Revisar Nao aparenta serem atributos deste model
  public sync_start_date?: Date;
  public sync_deadline?: Date;

  constructor(values: Lancamento) {
    super(values);
    Object.assign(this, values);
  }
}

