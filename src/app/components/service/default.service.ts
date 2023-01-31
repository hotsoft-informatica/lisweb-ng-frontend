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
  baseUrl : string = '/';
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

  create(record: any, endpoint: string): Observable<any> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

    return this.http.post<any>(this.baseUrl + endpoint, record, { headers: headers });
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    pageNumber = 1,
    pageSize = 3,
    queries: Query[],
    endpoint: string
  ): Observable<any[]> {
    // criando parametros e puxando dados do backend
    let params = new HttpParams(); // cria paramaetros para leitura do backend
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

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

    return this.http.get<any[]>(this.baseUrl + endpoint, { params: params, headers: headers }); // Passa qual operação sera realizada pelo backend
  }

  readById(id: number, endpoint: string): Observable<any> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

    const url = `${this.baseUrl + endpoint}/${id}`;
    return this.http.get<any>(url, { headers: headers });
  }

  update(record: any, endpoint: string): Observable<any> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

    const url = `${this.baseUrl + endpoint}/${record.id}`;
    return this.http.put<any>(url, record, { headers: headers });
  }

  delete(id: number, endpoint: string): Observable<any> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

    const url = `${this.baseUrl + endpoint}/${id}`;
    return this.http.delete<any>(url, { headers: headers });
  }

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null,
    endpoint: string
  ): Observable<any[]> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

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
      params: params, headers: headers
    });
  }

  count(endpoint: string): Observable<number> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

    return this.http.get<number>(this.baseUrl + endpoint, {
      params: new HttpParams().set('totalCount', 'true'),
      headers: headers
    });
  }
}
