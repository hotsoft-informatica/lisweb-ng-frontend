import { Base } from './base.model'
import { FornecedorSincronizacao } from './fornecedor-sincronizacao.model';

export class MaterialConsumo extends Base{
  public id?: number;
  public laboratorio_id?: number;
  public codigo?: string;
  public descricao?: string;
  public volume?: number;
  public modouso?: string;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public fornecedor_id?: number;
  public tipo_material_consumo_id?: number;
  public volume_residual?: number;
  public unidade_volume?: string;
  public cor_tampa?: string;
  public conservante_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public ativo?: string;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public uuid?: string
  public fornecedor_sincronizacao?: FornecedorSincronizacao;

  constructor(values: MaterialConsumo) {
    super(values);
    Object.assign(this, values);
  }
}
