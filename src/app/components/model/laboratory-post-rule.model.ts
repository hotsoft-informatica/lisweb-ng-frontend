export class LaboratoryPostRule {
    public id?: number;
    public post?: number;
    public laboratorio_id?: number;
    public laboratory_statement_rule_id?: number
    public criado_em?: Date;
    public created_at?: Date;
    public updated_at?: Date;
    
    constructor(values: LaboratoryPostRule) {
      Object.assign(this, values);
    }
  }
  