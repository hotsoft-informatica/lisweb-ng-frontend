import { Mime } from './mime.model';

export class ShowSignature {
  public mime?: Mime;
  public imagem?: string; // Longtext

  constructor(values: ShowSignature) {
    Object.assign(this, values);
  }
}
