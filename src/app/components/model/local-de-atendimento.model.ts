import { Base } from './base.model'
import { Empresa } from '../model/empresa.model';

export class LocalDeAtendimento extends Base{
  public nome?: string;
  public cnes?: string;
  public grupo_local_id?: number;
  public utilizar_chave_internet?: string;
  public chave_internet?: string;
  public grupo_historico?: number;
  public tipo_coleta?: string;
  public coleta_externa?: string;
  public empresa_id?: number;
  public utiliza_coleta?: string;
  public usa_biometria?: string;
  public painel_monitoramento?: string;
  public utiliza_crm?: string;
  public emitir_etiqueta_apoio_recepcao?: string;
  public cod_conselho?: string;
  public sigla_conselho?: string;
  public uf_conselho?: string;
  public trabalha_24_horas?: string;
  public trabalha_sabado?: string;
  public trabalha_domingo?: string;
  public horario_semana_inicio?: string;
  public horario_semana_fim?: string;
  public horario_sabado_inicio?: string;
  public horario_sabado_fim?: string;
  public horario_domingo_inicio?: string;
  public horario_domingo_fim?: string;
  public utiliza_normal?: string;
  public utiliza_pouco_urgente?: string;
  public utiliza_urgente?: string;
  public utiliza_muito_urgente?: string;
  public utiliza_emergencia?: string;
  public tempo_normal?: string;
  public tempo_pouco_urgente?: string;
  public tempo_urgente?: string;
  public tempo_muito_urgente?: string;
  public tempo_emergencia?: string;
  public agrupar_exames?: string;
  public modo_trabalho_padrao?: string;
  public empresa?: Empresa;

  constructor(values: LocalDeAtendimento) {
    super(values);
    Object.assign(this, values);
  }
}
