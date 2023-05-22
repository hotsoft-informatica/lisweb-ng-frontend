import { Base } from './base.model';

export class TipoInstrumento extends Base{
  public aprova_exame_bancada?: string;
  public cod_instrumento?: string;
  public descricao?: string;
  public diretorio_transf_dados?: string;
  public habilita_triagem_rapida?: string;
  public interfaceamento?: string;
  public liberacao_tecnica?: string;
  public realiza_query?: string;
  public sobrescreve_resultado?: string;

  public driver_id?: number;
  public modalidade?: number;
  public padrao_cod_barras?: number;
  public relatorio_id?: number;

  constructor(values: TipoInstrumento) {
    super(values);
    Object.assign(this, values);
  }
}
