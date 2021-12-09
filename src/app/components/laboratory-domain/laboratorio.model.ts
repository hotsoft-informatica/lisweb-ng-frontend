export class Laboratorio {
  public id?: number;
  public nome?: string;
  public createdAt?: Date = new Date();
  public updatedAt?: Date = new Date();
  public versionId?: number;
  public deleted?: boolean;
  public criadoEm?: Date = new Date();

  constructor(values: Laboratorio){
    Object.assign(this, values);
  }
}
