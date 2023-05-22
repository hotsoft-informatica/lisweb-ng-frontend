import { Base } from './base.model';

export class ClientServerTable {
    public id?: number;
    public server_name?: string;
    public client_name?: string;
    public visible?: number;
    public client_software_version_id?: number;
    public singular_name?: string;
    public default_statement?: string;
    public criado_em?: Date;
    public created_at?: Date;
    public updated_at?: Date;
    
    constructor(values: ClientServerTable) {
      Object.assign(this, values);
    }
  }
  