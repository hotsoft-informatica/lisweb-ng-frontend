export class SuperUser {
  public id?: number;
  public email?: string;
  public encrypted_password?: string;
  public password?: string;
  public password_confirmation?: string;
  public name?: string;
  public nickname?: string;
  public image?: string;
  public admin?: boolean;
  public tokens?: string;
  public reset_password_token?: string;
  public reset_password_sent_at?: string;
  public remember_created_at?: Date = new Date();
  public sign_in_count?: number;
  public current_sign_in_at?: Date = new Date();
  public last_sign_in_at?: Date = new Date();
  public current_sign_in_ip?: number;
  public last_sign_in_ip?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public laboratorio_id?: number;
  public laboratory_domain_id?: number;
  public changed_by_lab_id?: number;
  public version_id?: number;
  public original_id?: number;
  public jti?: string;

  constructor(values: SuperUser) {
    Object.assign(this, values);
  }
}
