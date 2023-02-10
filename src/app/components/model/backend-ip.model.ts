import { Base } from './base.model';

export class BackendIp extends Base{
  public ip?: string;

  constructor(values: BackendIp) {
    super(values);
    Object.assign(this, values);
  }
}
