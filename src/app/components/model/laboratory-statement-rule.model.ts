export class LaboratoryStatementRule {
    public id?: number;
    public name?: string;
    public criado_em?: Date;
    public statement?: string;
    public client_software_version_id?: number
    public client_server_table_id?: number
  
    constructor(values: LaboratoryStatementRule) {
      Object.assign(this, values);
    }
  }
  