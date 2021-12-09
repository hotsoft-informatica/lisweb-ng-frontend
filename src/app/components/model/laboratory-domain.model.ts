export class LaboratoryDomain {
  public id?: number;
  public name?: string;
  public created_at?: Date;
  public updated_at?: Date;
  public version_id?: number;
  public deleted?: boolean;
  public sync_start_date?: Date;
  public sync_deadline?: Date;
  public criado_em?: Date;

  constructor(values: LaboratoryDomain) {
    Object.assign(this, values);
  }
}
