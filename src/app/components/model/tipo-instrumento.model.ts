import { Data } from "@angular/router";
import { VersaoExame } from "./versao-exame.model";

export class TipoInstrumento{
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
  public created_at?: Date;
  public updated_at?: Date;
  public relatorio_id?: number;
  public driver_id?: number;
  public version_id?: number;
  public modalidade?: number;
  public laboratory_domain_id?: number;

  constructor(values: TipoInstrumento) {
    Object.assign(this, values);
  }
}
