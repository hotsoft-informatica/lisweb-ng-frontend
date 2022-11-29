import { Base } from './base.model'

export class Convenios extends Base{
  public nome?: string;
  public mascara_guia?: string;
  public mascara_codigo?: string;
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
  public x_filter_defs_id?: number;
  public dllintegracao?: string;
  public pastaintegracao?: string;

  constructor(values: Convenios) {
    super(values);
    Object.assign(this, values);
  }
}

