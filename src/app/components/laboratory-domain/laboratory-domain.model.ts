import { Laboratorio } from './laboratorio.model';

export class LaboratoryDomain {
  public id?: number;
  public name?: string;
  public createdAt?: Date = new Date();
  public updatedAt?: Date = new Date();
  public versionId?: number;
  public deleted?: boolean;
  public syncStartDate?: Date = new Date();
  public syncDeadline?: Date = new Date();
  public criadoEm?: Date = new Date();
  public laboratorios?: Laboratorio[];

  constructor(values: LaboratoryDomain){
    Object.assign(this, values);
  }
}
