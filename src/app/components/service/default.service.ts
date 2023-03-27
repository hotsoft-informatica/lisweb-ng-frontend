import { BackendIpService } from './backend-ip.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Query } from './../model/query.model';

@Injectable({
  providedIn: 'root',
})

export class DefaultService {
  baseUrl: string = '/';
  query: Query[] = [];
  storage: Storage = window.localStorage;

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    // IP + Port + '/'
    this.baseUrl = this.backendIpService.getUrl() + this.baseUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  create(record: any, endpoint: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + endpoint, record);
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    pageNumber = 0,
    pageSize = 5,
    queries: Query[],
    endpoint: string
  ): Observable<any[]> {
    // criando parametros e puxando dados do backend
    let params = new HttpParams(); // cria paramaetros para leitura do backend

    queries.forEach((busca) => {
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
    return this.http.get<any[]>(this.baseUrl + endpoint, { params: params, }); // Passa qual operação sera realizada pelo backend
  }

  readById(id: number, endpoint: string): Observable<any> {
    const url = `${this.baseUrl + endpoint}/${id}`;

    if (id == null) {
      return new Observable();
    } else {
      return this.http.get<any>(url);
    }
  }

  update(record: any, endpoint: string): Observable<any> {
    const url = `${this.baseUrl + endpoint}/${record.id}`;
    return this.http.put<any>(url, record);
  }

  delete(id: number, endpoint: string): Observable<any> {
    const url = `${this.baseUrl + endpoint}/${id}`;
    return this.http.delete<any>(url);
  }

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 0,
    pageSize: number = 5,
    query: Query[] | null,
    endpoint: string
  ): Observable<any[]> {
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
    return this.http.get<any[]>(this.baseUrl + endpoint, {
      params: params,
    });
  }

  count(endpoint: string): Observable<number> {
    return this.http.get<number>(this.baseUrl + endpoint, {
      params: new HttpParams().set('totalCount', 'true')
    });
  }
}
