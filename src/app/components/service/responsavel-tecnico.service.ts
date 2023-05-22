import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsavelTecnico } from '../model/responsavel-tecnico.model';
import { ShowSignature } from '../model/show-signature.model';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelTecnicoService extends BaseService {
  showSignatureUrl = '/responsaveis_tecnico/show_signature';
  selectedFile!: File;
  fileName: string = '';

  constructor(
    @Inject(Injector) public injector: Injector,
    public http: HttpClient,
  ) {
    super(injector, http);
    this.endpoint = 'responsaveis_tecnico'
  }

  readSigatureById(id: number): Observable<ShowSignature> {
    const url = `${this.showSignatureUrl}/${id}`;
    return this.http.get<ShowSignature>(url);
  }

  upload(selectedFile: FormData, responsavel_tecnico: ResponsavelTecnico): Observable<any> {
    const url = this.getBaseUrl() + 'responsaveis_tecnico/' + responsavel_tecnico.id + '/upload'
    return this.http.post<FormData>(url, selectedFile);
  }
}
