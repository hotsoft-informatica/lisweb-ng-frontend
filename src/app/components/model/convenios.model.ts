export class Convenios {
  public id?: number;
  public laboratorio_id?: number;
  public nome?: string;
  public mascara_guia?: string;
  public mascara_codigo?: string;
  public original_id?: number;
  public vias_relatorio?: number;
  public idrelatorioguia?: number;
  public idrelatoriofatura?: number;
  public layout_fatura?: string;
  public senha?: string;
  public registro_ans?: string;
  public registro_lab_prest?: string;
  public usa_registro_lab_prest?: string;
  public usa_tiss?: string;
  public local_criacao_arquivos_tis?: string;
  public local_backup_arquivos_recebidos?: string;
  public local_backup_arquivos_criados?: string;
  public forma_comunicacao_tiss?: string;
  public informacoes_adicionais_tiss?: string;
  public campo_solicitante_tiss?: string;
  public idrelatorioexportacao?: number;
  public operadora_id?: number;
  public versao_xsd?: string;
  public forma_ident_estab_saude?: string;
  public versao_nominal?: string;
  public email?: string;
  public chave_web?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public x_filter_defs_id?: number;
  public dllintegracao?: string;
  public pastaintegracao?: string;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();



  constructor(values: Convenios) {
    Object.assign(this, values);
  }
}

