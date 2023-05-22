import { Base } from './base.model'
export class LaboratoryGetFilter extends Base{
  public id?: number;
  public name?: string;
  public custom_where?: string;
  public client_software_version_id?: number;
  public client_server_table_id?: number;
  public criado_em?: Date = new Date();
  
  constructor(values: LaboratoryGetFilter) {
    super(values);
    Object.assign(this, values);
  }
}
