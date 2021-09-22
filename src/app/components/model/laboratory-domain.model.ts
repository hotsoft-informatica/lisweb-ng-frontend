export class LaboratoryDomain {
  public id?: number;
  public name?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public deleted?: boolean;
  public sync_start_date?: Date = new Date();
  public sync_deadline?: Date = new Date();
  public criado_em?: Date = new Date();

  constructor(values: LaboratoryDomain = {}) {
    Object.assign(this, values);
  }
}
