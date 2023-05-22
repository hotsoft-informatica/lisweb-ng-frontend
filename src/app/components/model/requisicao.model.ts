import { Base } from './base.model'; 

export class Requisicao extends Base{
  public arquivo_envio_id?: number;
  public arquivo_recebimento_id?: number;
  public autorizacao_enviada?: string;
  public carater_solicitacao?: string;
  public cid10?: string;
  public cod_requisicao_apoio?: number;
  public cod_seguro?: string;
  public contem_pendencia?: string;
  public convenio_id?: number;
  public data_autorizacao_guia?: Date = new Date();
  public data_guia?: Date = new Date();
  public data_hora_recoleta?: Date = new Date();
  public data?: Date = new Date();
  public enviar_stockfin?: string;
  public estabelecimento_saude_id?: number;
  public finalizado?: string;
  public guia_principal?: string;
  public guia?: string;
  public hora_chegada?: string;
  public idade?: number;
  public inicio_requisicao?: Date = new Date();
  public justificativa_reter?: string;
  public local_atendimento_id?: number;
  public medico_id?: number;
  public movimentado?: string;
  public nome_pagador?: string;
  public nota_enviada?: string;
  public num_guia_operadora?: string;
  public num_leito?: string;
  public num_prontuario?: string;
  public num_protocolo?: number;
  public num_quarto?: string;
  public numero_chamada?: string;
  public observacao_ficha?: string;
  public observacao?: string;
  public paciente_id?: number;
  public prioridade_coleta_id?: number;
  public recem_nascido?: string;
  public requisicao_apoiado_id?: number;
  public senha_acesso_resultado?: string;
  public senha_autorizacao?: string;
  public senha_pre_atendimento_id?: number;
  public sexo?: string;
  public tipo_atendimento?: number;
  public total?: number;
  public usuario_atendente_id?: number;
  public usuario_nota_id?: number;
  public validade_carteirinha?: Date = new Date();
  public validade_senha_autorizacao?: Date = new Date();
  public valor_cobertura?: number;
  public valor_desconto?: number;
  public valor_recebido?: number;
  public valor_saldo?: number;
  public valor_taxas_extras?: number;
  public valor_total?: number;

  constructor(values: Requisicao) {
    super(values);
    Object.assign(this, values);
  }
}
