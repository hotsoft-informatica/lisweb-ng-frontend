import { User } from "./user.model";
export class Usuario {
  public id?: number;
  public laboratorio_id?: number;
  public nome?: string;
  public login?: string;
  public senha?: string;
  public confirmaSenha?: string;
  public original_id?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public status?: string;
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public cargo_id?: number;
  public enviar_stockfin?: string;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number;
  public grupos?: string;
  public user_id?: number;

  constructor(values: Usuario) {
    Object.assign(this, values);
  }
}
