import { Base } from './base.model'; 

export class ResponsavelTecnico extends Base{
  public cbos?: string;
  public certificado?: string;
  public conselho?: string;
  public cpf?: string;
  public registro_profissional?: string;
  public titulo?: string;
  public uf_conselho?: string;

  public usuario_id?: number;

  public assinatura?: File;

  constructor(values: ResponsavelTecnico) {
    super(values);
    Object.assign(this, values);
  }
}
