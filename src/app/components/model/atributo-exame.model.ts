import { Base } from './base.model';
export class AtributoExame extends Base{
  public calculado?: string;
  public celula_absoluta?: string;
  public cod_atributo?: string;
  public cod_resultado_apoio?: string;
  public contar_celulas?: string;
  public formula?: string;
  public imprimir_historico?: string;
  public informado?: string;
  public instrucao_compatibilizacao?: string;
  public lista_resultados?: string;
  public mascara_edicao_resultado?: string;
  public permite_caractere?: string;
  public restringir_lista?: string;
  public rotulo?: string;
  public template_resultado?: string;
  public tipo_resultado?: string;
  public unidade_resultado?: string;
  public utiliza_grafico?: string;
  public utilizar_grafico?: string;
  public versao_exame_id?: string;
  public visivel?: string;
  
  public num_multi_amostra?: number;
  public intervalo_coleta?: number;
  public ordem?: number;
  public tecla_contagem?: number;

  constructor(values: AtributoExame) {
    super(values);
    Object.assign(this, values);
  }
}
