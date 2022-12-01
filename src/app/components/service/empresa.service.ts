import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Empresa } from '../model/empresa.model';
import { BackendIpService } from './backend-ip.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  baseUrl = '/empresas';

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = this.backendIpService.getUrl() + this.baseUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(empresa: Empresa): Observable<Empresa> {
    empresa.laboratorio_id = 2; // TODO pegar id do laboratório logado na sessão.
    return this.http.post<Empresa>(this.baseUrl, empresa);
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    pageNumber = 1,
    pageSize = 3,
    queries: Query[] = []): Observable<Empresa[]> { // criando parametros e puxando dados do backend
    let params = new HttpParams(); // cria paramaetros para leitura do backend

    queries.forEach(busca => {
      params = params.append(busca.key, busca.value); // comunicação com backend key=busca value=valor do item
    });
    params = params.append('sortActive', sortActive); // Qual coluna sera ordenada
    params = params.append('sortDirection', sortDirection); // Ordem desc ou asc
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    queries?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<Empresa[]>(this.baseUrl, { params }); // Passa qual operação sera realizada pelo backend
  }

  readById(id: number): Observable<Empresa> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Empresa>(url);
  }

  update(empresa: Empresa = new Empresa({})): Observable<Empresa> {
    const url = `${this.baseUrl}/${empresa.id}`;
    return this.http.put<Empresa>(url, empresa);
  }

  delete(id: number): Observable<Empresa> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Empresa>(url);
  }

  findEmpresas(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Empresa[]> {
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

    return this.http.get<Empresa[]>(this.baseUrl, {
      params,
    });
  }

  countEmpresas(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
