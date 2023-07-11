import { Base } from './base.model';
import { TipoRelatorio } from './tipo-relatorio.model';

export class Relatorio extends Base{
  public id?: number;
  public titulo?: string;
  public descricao?: string;
  public compativel_apartir_da_versao?: string;
  public compativel_ate_versao?: string;
  public data_importacao?: Date = new Date();
  public usuario_importacao_id?: number;
  public arquivo_origem?: string;
  public classe_impressora?: string;
  public x_filter_def_id?: number;
  public classe_relatorio?: string;
  public orientation?: number;
  public margem_esquerda?: number;
  public margem_direita?: number;
  public margem_superior?: number;
  public altura_papel?: number;
  public largura_papel?: number;
  public tipo_saida?: string;
  public laboratorio_id?: number;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public tipo_relatorio_id?: number;
  public version_id?: number;
  public margem_inferior?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public itemid?: number;
  public uuid?: string;
  public tipo_relatorio?: TipoRelatorio;

  constructor(values: Relatorio) {
    super(values);
    Object.assign(this, values);
  }
}
