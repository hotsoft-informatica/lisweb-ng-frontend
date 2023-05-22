import { Base } from './base.model';
        
export class Bandeja extends Base{
  public dias_descarte?: number;
  public numero_bandeja?: number;
  public tamanho_x?: number;
  public tamanho_y?: number;
  public usuario_criacao_id?: number;
  public usuario_descarte_id?: number;
  public usuario_fechamento_id?: number;
  
  public local?: string;
  public permanente?: string;
  public status?: string;
  
  public data_criacao?: Date = new Date();
  public data_descarte?: Date = new Date();
  
  constructor(values: Bandeja) {
    super(values);
    Object.assign(this, values);
  }
}
