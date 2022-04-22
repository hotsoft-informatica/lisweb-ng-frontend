import { Binary } from "@angular/compiler";

export class ResponsavelTecnico {
  public id?: number;
  public original_id?: number;
  public laboratorio_id?: number;
  public usuario_id?: number;
  public titulo?: string;
  public registro_profissional?: string;
  public assinatura?: File;
  public conselho?: string;
  public uf_conselho?: string;
  public cbos?: string;
  public cpf?: string;
  public certificado?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public version_id?: number;
  public laboratory_domain_id?: number;
  public deleted?: boolean;
  public synchronized?: boolean;
  public criado_em?: Date = new Date();
  public changed_by_lab_id?: number

  constructor(values: ResponsavelTecnico) {
    Object.assign(this, values);
  }
}
