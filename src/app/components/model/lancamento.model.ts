import { PessoaService } from '../service/pessoa.service';
import { Pessoa } from './pessoa.model';

export class Lancamento {
  public id?: number;
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
  public laboratorio_id?: string;
  public conta_id?: number;

  public id_original?: string;
  public laboratory_domain_id?: string;
  public created_at?: Date;
  public updated_at?: Date;
  public version_id?: number;
  public deleted?: boolean;
  public sync_start_date?: Date;
  public sync_deadline?: Date;
  public criado_em?: Date;
  public pessoa?: Pessoa;

  constructor(values: Lancamento) {
    Object.assign(this, values);
  }
}

