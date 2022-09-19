export class Recurso {
  public id?: number;
  public laboratorio_id?: number;
  public descricao?: string;
  public nome?: string;
  public filter_def_name?: string;
  public data_class_name?: string;
  public res_class_name?: string;
  public report_class_name?: string;
  public num_ordem?: number;
  public indice_imagem?: number;
  public habilita_editar_todos?: string;
  public forcar_execucao_filtro?: string;
  public original_id?: number;
  public tipo_recurso_id?: number;
  public dominio_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;

  constructor(values: Recurso) {
    Object.assign(this, values);
  }
}
