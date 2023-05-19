export class LaboratoryGetRule {
    public id?: number;
    public laboratorio_id?: number;
    public laboratory_get_filter_id?: number;
    public client_server_table_id?: number;
    public can_get?: number;
    
    constructor(values: LaboratoryGetRule) {
      Object.assign(this, values);
    }
  }
  