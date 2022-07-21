export class AtributoExame {
  public id?: number;
  public laboratorio_id?: number;
  public original_id?: number;
  public cod_atributo?: string;
  public rotulo?: string;
  public ordem?: number;
  public tipo_resultado?: string;
  public unidade_resultado?: string;
  public informado?: string;
  public calculado?: string;
  public visivel?: string;
  public lista_resultados?: string;
  public formula?: string;
  public mascara_edicao_resultado?: string;
  public template_resultado?: string;
  public num_multi_amostra?: number;
  public intervalo_coleta?: number;
  public restringir_lista?: string;
  public cod_resultado_apoio?: string;
  public instrucao_compatibilizacao?: string;
  public contar_celulas?: string;
  public tecla_contagem?: number;
  public celula_absoluta?: string;
  public versao_exame_id?: string;
  public utilizar_grafico?: string;
  public imprimir_historico?: string;
  public utiliza_grafico?: string;
  public permite_caractere?: string;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;

  constructor(values: AtributoExame) {
    Object.assign(this, values);
  }
}
