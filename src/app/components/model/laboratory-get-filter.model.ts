import { Laboratorio } from './laboratorio.model';
export class LaboratoryGetFilter {
  public id?: number;
  public name?: string;
  public custom_where?: string;
  public client_software_version_id?: number;
  public client_server_table_id?: number;
  public criado_em?: Date = new Date();
  
  constructor(values: LaboratoryGetFilter) {
    Object.assign(this, values);
  }
}
