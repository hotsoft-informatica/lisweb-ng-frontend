import { BaseRaw } from './base-raw.model'
export class LaboratoryDomain extends BaseRaw{
  public name?: string;
  public sync_start_date?: Date;
  public sync_deadline?: Date;

  constructor(values: LaboratoryDomain) {
    super(values);
    Object.assign(this, values);
  }
}
