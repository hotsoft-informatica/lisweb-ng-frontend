import { ResponsavelTecnico } from '../model/responsavel-tecnico.model';
import { ShowSignature } from '../model/show-signature.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ResponsavelTecnicoService {
  baseUrl = '/responsaveis_tecnico';
  showSignatureUrl = '/responsaveis_tecnico/show_signature';

  query: Query[] = [];

  selectedFile!: File;
  fileName: string = '';

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
    this.showSignatureUrl = backendIpService.getUrl() + this.showSignatureUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(responsavel_tecnico: ResponsavelTecnico): Observable<ResponsavelTecnico> {
    return this.http.post<ResponsavelTecnico>(this.baseUrl, responsavel_tecnico);
  }

  read(): Observable<ResponsavelTecnico[]> {
    return this.http.get<ResponsavelTecnico[]>(this.baseUrl);
  }

  readById(id: number): Observable<ResponsavelTecnico> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ResponsavelTecnico>(url);
  }

  readSigatureById(id: number): Observable<ShowSignature> {
    const url = `${this.showSignatureUrl}/${id}`;
    return this.http.get<ShowSignature>(url);
  }

  update(responsavel_tecnico: ResponsavelTecnico): Observable<ResponsavelTecnico> {
    const url = `${this.baseUrl}/${responsavel_tecnico.id}`;
    return this.http.put<ResponsavelTecnico>(url, responsavel_tecnico);
  }

  upload(selectedFile: FormData, responsavel_tecnico: ResponsavelTecnico): Observable<any> {
    const url = this.baseUrl + '/' + responsavel_tecnico.id + '/upload'
    return this.http.post<FormData>(url, selectedFile);
  }

  delete(id: number): Observable<ResponsavelTecnico> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ResponsavelTecnico>(url);
  }

  findResponsavelTecnico(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<ResponsavelTecnico[]> {
    let params = new HttpParams()
      .set('active', active)
      .set('sortOrder', sortOrder)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<ResponsavelTecnico[]>(this.baseUrl, {
      params,
    });
  }

  countResponsavelTecnico(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
