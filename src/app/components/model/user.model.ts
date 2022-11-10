export class User {
  public id?: number;
  public provider?: string;
  public uid?: string;
  public encrypted_password?: string;
  public reset_password_token?: string;
  public reset_password_sent_at?: string;
  public allow_password_change?: boolean;
  public remember_created_at?: Date = new Date();
  public confirmation_token?: string;
  public confirmed_at?: Date = new Date();
  public unconfirmed_email?: Date = new Date();
  public sign_in_count?: number;
  public current_sign_in_at?: Date = new Date();
  public last_sign_in_at?: Date = new Date();
  public name?: string;
  public nickname?: string;
  public image?: string;
  public email?: string;
  public admin?: boolean;
  public tokens?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public laboratorio_id?: number;
  public laboratory_domain_id?: number;
  public changed_by_lab_id?: number;
  public version_id?: number;
  public original_id?: number;
  public current_sign_in_ip?: number;
  public last_sign_in_ip?: number;

  constructor(values: User) {
    Object.assign(this, values);
  }
}
