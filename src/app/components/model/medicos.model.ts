import { Base } from './base.model';
export class Medicos {
  public id?:number;
  public original_id?: number;
  public especialidade_id?:number;
  public laboratorio_id?:number;
  public cod_medico?:string;
  public nome?:string;
  public crm?:string;
  public endereco?:string;
  public bairro?:string;
  public cep?:string;
  public cidade?:string;
  public uf?:string;
  public telefone?:string;
  public fax?:string;
  public email?:string;
  public senha?:string;
  public iniciais?:string;
  public nome_sombra?:string;
  public cpf?:string;
  public cnes?:string;
  public conselho?:string;
  public uf_conselho?:string;
  public cns?:string;
  public numero?:string;
  public data_nascimento?:Date =new Date();
  public celular?:string;
  public enviar_stokfin?:string;
  public status?:string;
  public operadora_telefonia_id?: number;
  public recebe_mensagem_automatica?: string;
  public recebe_mensagem_adicional?: string;
  public recebe_sms?:string ;
  public recebe_email?: string;
  public created_at?: Date =new Date();
  public updated_at?: Date =new Date();
  public version_id?:number
  public laboratory_domain_id?:number
  public deleted?:boolean;
  public criado_em?: Date =new Date();
  public changed_by_lab_id?:bigint
  public orientacao?:string

  constructor(values: Medicos) {
    Object.assign(this, values);
  }
}
