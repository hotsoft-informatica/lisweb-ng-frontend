export class ValorReferencia {
  public id?: number;
  public laboratorio_id?: number;
  public original_id?: number;
  public sexo?: string;
  public val_minimo?: number;
  public val_maximo?: number;
  public texto?: string;
  public val_minimo_absurdo?: number;
  public val_maximo_absurdo?: number;
  public idade_minima?: string;
  public idade_maxima?: string;
  public versao_exame_id?: number;
  public atributo_exame_id?: number;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public val_maximo_critico?: number;
  public val_minimo_critico?: number;

  constructor(values: ValorReferencia) {
    Object.assign(this, values);
  }
}
