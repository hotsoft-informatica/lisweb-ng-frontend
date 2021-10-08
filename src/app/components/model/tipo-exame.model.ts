export class TipoExame {
  public id?: number;
  public laboratorio_id?: number;
  public cod_exame?: string;
  public descricao?: string;
  public tipo_resultado?: string;
  public texto_mapa?: string;
  public sexo?: string;
  public ordem_laudo?: number;
  public publica_resultado?: string;
  public imprime_historico?: string;
  public resultado_controlado?: string;
  public multi_amostra?: string;
  public resultado_parcial?: string;
  public historico_grafico?: string;
  public resultado_grafico?: string;
  public coletor_mesmo_sexo?: string;
  public regua_referencial?: string;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public bancada_id?: number;
  public version_id?: number;
  public tipo_historico?: string;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number

  constructor(values: TipoExame) {
    Object.assign(this, values);
  }
}
