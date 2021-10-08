export class Bancada {
  public id?: number;
  public laboratorio_id?: number;
  public nome?: string;
  public cod_area?: string;
  public cor?: number;
  public habilita_triagem_rapida?: string;
  public cor_fonte?: number;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public relatorio_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;

  constructor(values: Bancada) {
    Object.assign(this, values);
  }
}
