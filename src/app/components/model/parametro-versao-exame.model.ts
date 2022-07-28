export class ParametroVersaoExame {
  public id?: number;
  public laboratorio_id?: number;
  public original_id?: number;
  public chave?: string;
  public valor?: string;
  public versao_exame_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;

  constructor(values: ParametroVersaoExame) {
    Object.assign(this, values);
  }
}
