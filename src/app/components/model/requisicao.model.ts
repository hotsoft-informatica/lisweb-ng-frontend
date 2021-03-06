export class Requisicao {
  public id?: number;
  public original_id?: number;
  public laboratorio_id?: number;
  public num_protocolo?: number;
  public data?: Date = new Date();
  public sexo?: string;
  public idade?: number;
  public total?: number;
  public valor_cobertura?: number;
  public valor_desconto?: number;
  public valor_saldo?: number;
  public cod_seguro?: string;
  public guia?: string;
  public observacao?: string;
  public num_prontuario?: string;
  public num_quarto?: string;
  public num_leito?: string;
  public valor_recebido?: number;
  public senha_acesso_resultado?: string;
  public nome_pagador?: string;
  public movimentado?: string;
  public observacao_ficha?: string;
  public validade_carteirinha?: Date = new Date();
  public guia_principal?: string;
  public senha_autorizacao?: string;
  public data_autorizacao_guia?: Date = new Date();
  public data_guia?: Date = new Date();
  public validade_senha_autorizacao?: Date = new Date();
  public num_guia_operadora?: string;
  public carater_solicitacao?: string;
  public cid10?: string;
  public numero_chamada?: string;
  public tipo_atendimento?: number;
  public contem_pendencia?: string;
  public data_hora_recoleta?: Date = new Date();
  public valor_total?: number;
  public valor_taxas_extras?: number;
  public recem_nascido?: string;
  public autorizacao_enviada?: string;
  public inicio_requisicao?: Date = new Date();
  public hora_chegada?: string;
  public enviar_stockfin?: string;
  public nota_enviada?: string;
  public cod_requisicao_apoio?: number;
  public finalizado?: string;
  public justificativa_reter?: string;
  public usuario_nota_id?: number;
  public senha_pre_atendimento_id?: number;
  public local_atendimento_id?: number;
  public paciente_id?: number;
  public medico_id?: number;
  public estabelecimento_saude_id?: number;
  public requisicao_apoiado_id?: number;
  public prioridade_coleta_id?: number;
  public usuario_atendente_id?: number;
  public arquivo_envio_id?: number;
  public arquivo_recebimento_id?: number;
  public convenio_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public synchronized?: boolean;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number

  constructor(values: Requisicao) {
    Object.assign(this, values);
  }
}
