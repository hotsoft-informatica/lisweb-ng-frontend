import { Base } from './base.model';
import { Dominio } from "./dominio.model";
import { Laboratorio } from "./laboratorio.model";
import { TipoRecurso } from "./tipo-recurso.model";

export class Recurso extends Base{
  public data_class_name?: string;
  public descricao?: string;
  public dominio_id?: number;
  public dominios?: Dominio;
  public filter_def_name?: string;
  public forcar_execucao_filtro?: string;
  public habilita_editar_todos?: string;
  public indice_imagem?: number;
  public laboratorios?: Laboratorio;
  public nome?: string;
  public num_ordem?: number;
  public report_class_name?: string;
  public res_class_name?: string;
  public tipo_recurso_id?: number;
  public tipos_recurso?: TipoRecurso;

  constructor(values: Recurso) {
    super(values)
    Object.assign(this, values);
  }
}
