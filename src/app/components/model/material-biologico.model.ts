export class MaterialBiologico {
  public id?: number;
  public laboratorio_id?: number;
  public nome?: string;
  public unidade_coleta?: string;
  public estado_fisico?: string;
  public cod_material_biologico?: string;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public material_biologico_coleta_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number

  constructor(values: MaterialBiologico) {
    Object.assign(this, values);
  }

}
