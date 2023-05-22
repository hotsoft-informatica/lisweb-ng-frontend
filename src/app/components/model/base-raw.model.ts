
export class BaseRaw {
  public changed_by_lab_id?: number = 0
  public id?: number | undefined;
  public laboratorio_id?: number | undefined;
  public laboratory_domain_id?: number | undefined;
  public original_id?: number | undefined;
  public version_id?: number | undefined;

  public created_at?: Date = new Date();
  public criado_em?: Date = new Date();
  public updated_at?: Date = new Date();

  public deleted?: boolean = false;
  // TODO: Mover para interface
  // public synchronized?: boolean = true;

  constructor(values: {}) {
    // TODO: Generate a unique random value
    // this.original_id = 0;
    Object.assign(this, values);
  }
}
