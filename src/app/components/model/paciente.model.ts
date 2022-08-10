export class Paciente {
  public id?: number;
  public laboratorio_id?: number;
  public original_id?= 0;
  public cod_paciente?: string;
  public nome?: string;
  public nome_mae?: string;
  public rg?: string;
  public data_nascimento?: Date = new Date();
  public idade_paciente?: string;
  public sexo?: string;
  public cor?: string;
  public endereco?: string;
  public bairro?: string;
  public cep?: string;
  public cidade?: string;
  public uf?: string;
  public telefone?: string;
  public fax?: string;
  public email?: string;
  public convenio_id?: number;
  public cod_seguro?: string;
  public nome_titular?: string;
  public observacao?: string;
  public nome_sombra?: string;
  public data_cadastro?: Date = new Date();
  public data_nascimento_estimada?: string;
  public celular?: string;
  public comercial?: string;
  public ncns?: string;
  public validade_carteirinha?: Date = new Date();
  public numero_carteirinha?: string;
  public numero?: string;
  public cod_ibge_municipio?: string;
  public cpf?: string;
  public enviar_stockfin?: string;
  public toten?: string;
  public complemento_endereco?: string;
  public operadora_telefonia_id?: number;
  public recebe_mensagem_automatica?: string;
  public recebe_mensagem_adicional?: string;
  public recebe_sms?: string;
  public recebe_email?: string;
  public tipo_logradouro?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public ativo?: string;
  public laboratory_domain_id?: number;
  public cartao_magnetico?: string;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;

  Conveniosconstructor(values: Paciente) {
    Object.assign(this, values);
  }
}
