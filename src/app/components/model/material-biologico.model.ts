import { Base } from './base.model';
export class MaterialBiologico extends Base{
  public cod_material_biologico?: string;
  public estado_fisico?: string;
  public nome?: string;
  public unidade_coleta?: string;

  public material_biologico_coleta_id?: number;

  constructor(values: MaterialBiologico) {
    super(values);
    Object.assign(this, values);
  }

}
