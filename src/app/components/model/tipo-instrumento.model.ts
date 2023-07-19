import { Base } from './base.model';
import { Driver } from './driver.model';

export class TipoInstrumento extends Base{
  public id?: number;
  public laboratorio_id?: number;
  public descricao?: string;
  public padrao_cod_barras?: number;
  public diretorio_transf_dados?: string;
  public cod_instrumento?: string;
  public aprova_exame_bancada?: string;
  public habilita_triagem_rapida?: string;
  public interfaceamento?: string;
  public liberacao_tecnica?: string;
  public realiza_query?: string;
  public sobrescreve_resultado?: string;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public relatorio_id?: number;
  public driver_id?: number;
  public version_id?: number;
  public modalidade?: string;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public uuid?: string;
  public drivers?: Driver;

  constructor(values: TipoInstrumento) {
    super(values);
    Object.assign(this, values);
  }
}
