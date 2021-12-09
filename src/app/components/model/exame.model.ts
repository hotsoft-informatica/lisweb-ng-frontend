export class Exame {
  public id?: number;
  public original_id?: number;
  public laboratorio_id?: number;
  public num_protocolo?: number;
  public cod_exame?: string;
  public cod_seguro?: string;
  public cod_original?: string;
  public guia?: string;
  public preco?: number;
  public num_pontos?: number;
  public valor_cobertura?: number;
  public data_entrega?: Date = new Date();
  public tipo_resultado?: string;
  public resultado_texto?: string;
  public resultado_numerico?: string;
  public unidade_resultado?: string;
  public observacao?: string;
  public texto_valor_referencia?: string;
  public data_hora_resultado?: Date = new Date();
  public urgente?: string;
  public status?: string;
  public publica_resultado?: string;
  public imprime_historico?: string;
  public publicresultado_controlado?: string;
  public resultado_normal?: string;
  public multi_amostra?: string;
  public data_hora_aprovacao?: Date = new Date();
  public status_publicacao?: string;
  public omitir_laudo?: string;
  public amostra_exclusiva?: string;
  public sequencial_laudo?: number;
  public usar_valor_referencia_texto?: string;
  public nivel_urgencia?: string;
  public nao_coletar?: string;
  public liberacao_automatica?: string;
  public data_hora_liberacao?: Date = new Date();
  public coletor_mesmo_sexo?: string;
  public observacao_instrumento?: string;
  public previsao_normal_resultado?: Date = new Date();
  public previsao_critica_resultado?: Date = new Date();
  public previsao_normal_aprovacao?: Date = new Date();
  public previsao_critica_aprovacao?: Date = new Date();
  public status_autorizacao?: string;
  public val_minimo?: number;
  public val_maximo?: number;
  public val_minimo_absurdo?: number;
  public val_maximo_absurdo?: number;
  public aprovacao_automatica?: string;
  public nao_aprovar_automatico?: string;
  public material_biologico_id?: number;
  public bancada_id?: number;
  public tipo_exame_id?: number;
  public versao_exame_id?: number;
  public convenio_id?: number;
  public laboratorio_apoio_id?: number;
  public tipo_instrumento_id?: number;
  public contrato_convenio_id?: number;
  public usuario_aprovacao_id?: number;
  public usuario_resultado_id?: number;
  public requisicao_id?: number;
  public usuario_liberacao_tecnica_id?: number;
  public exame_apoiado_id?: number;
  public instrumento_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public validade_carteirinha?: Date = new Date();
  public guia_principal?: string;
  public senha_autorizacao?: string;
  public data_autorizacao_guia?: Date = new Date();
  public data_guia?: Date = new Date();
  public validade_senha_autorizacao?: Date = new Date();
  public num_guia_operadora?: string;
  public cid10?: string;
  public medico_id?: number;
  public usuario_conferencia_guia_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public val_maximo_critico?: number;
  public val_minimo_critico?: number;
  public dado_auxiliar?: string;

  constructor(values: Exame) {
    Object.assign(this, values);
  }
}
