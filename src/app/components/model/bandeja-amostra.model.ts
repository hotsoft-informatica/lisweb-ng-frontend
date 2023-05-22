import { Base } from './base.model';
export class BandejaAmostra extends Base{
  public amostra_id?: number;
  public bandeja_id?: number;
  public posicao_x?: number;
  public posicao_y?: number;
  public usuario_arquivamento_id?: number;
  public usuario_retirada_id?: number;

  public data_arquivamento?: Date = new Date();
  public data_retirada?: Date = new Date();

  public status?: string;

  constructor(values: BandejaAmostra) {
    super(values);
    Object.assign(this, values);
  }
}
