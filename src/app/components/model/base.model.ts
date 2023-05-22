import { BaseRaw } from './base-raw.model';
import { LaboratoryDomain } from './laboratory-domain.model';
import { Laboratorio } from './laboratorio.model';

export class Base extends BaseRaw{
  public laboratorio?: Laboratorio | undefined;
  public laboratoryDomain?: LaboratoryDomain | undefined;

  constructor(values: {}) {
    super(values);
    // TODO: Generate a unique random value
    // this.original_id = 0;
    Object.assign(this, values);
  }

}
