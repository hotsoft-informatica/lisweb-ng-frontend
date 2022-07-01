import { Query } from './../model/query.model';
import { Operadora } from '../model/operadora.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class OperadoraService {
  baseUrl = '/operadoras';

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(operadora: Operadora): Observable<Operadora> {
    operadora.laboratorio_id = 2; // TODO pegar id do laboratório logado na sessão.
    return this.http.post<Operadora>(this.baseUrl, operadora);
  }

  read(): Observable<Operadora[]> {
    return this.http.get<Operadora[]>(this.baseUrl);
  }

  readById(id: number): Observable<Operadora> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Operadora>(url);
  }

  update(operadora: Operadora): Observable<Operadora> {
    const url = `${this.baseUrl}/${operadora.id}`;
    return this.http.put<Operadora>(url, operadora);
  }

  delete(id: number): Observable<Operadora> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Operadora>(url);
  }

  findOperadoras(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Operadora[]> {
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

    return this.http.get<Operadora[]>(this.baseUrl, {
      params,
    });
  }

  countOperadoras(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
