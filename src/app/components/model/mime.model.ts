import { Base } from './base.model';
export class Mime {
  public type!: string;
  public mediatype!: string;
  public subtype!: string;

  constructor(values: Mime) {
    Object.assign(this, values);
  }
}
