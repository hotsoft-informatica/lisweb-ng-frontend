export class VersaoExame {
  public id?: number;
  public laboratorio_id?: number;
  public versao?: number;
  public agrupamento?: number;
  public descricao?: string;
  public descritivo?: string;
  public volume?: Date = new Date();
  public diluicao?: number;
  public analito?: string;
  public escala?: string;
  public status?: string;
  public aprovado?: string;
  public original_id?: number;
  public version?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public metodo_exame_id?: number;
  public tipo_exame_id?: number;
  public tipo_instrumento_id?: number;
  public material_biologico_id?: number;
  public laboratorio_apoio_id?: number;
  public marcacao_id?: number;
  public tipo_propriedade?: string;
  public aspecto_temporal?: string;
  public cod_exame_laboratorio?: string;
  public custo_laboratorio?: Date = new Date();
  public dias_entrega_laboratorio?: number;
  public recebe_material?: string;
  public amostra_exclusiva?: string;
  public permite_caracteres?: string;
  public unidade_resultado?: string;
  public mascara_edicao_resultado?: string;
  public cod_resultado_apoio?: string;
  public instrucao_compatibilizacao?: string;
  public versao_compatibilizacao_apoio?: string;
  public instrucao_compatibilizacao_obs?: string;
  public titulo_laudo?: string;
  public valor_referencia_texto?: string;
  public valor_referencia_apoio?: string;
  public versao_exame_original_id?: number;
  public data_hora_criacao?: Date = new Date();
  public usar_valor_referencia_texto?: string;
  public agrupamento_historico?: number;
  public laudagem_externa?: string;
  public laudagem_externa_coleta?: string;
  public agrupamento_amostra?: string;
  public laudo_banda_imagem?: BinaryType;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public formula?: string;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number

  constructor(values: VersaoExame) {
    Object.assign(this, values);
  }
}
