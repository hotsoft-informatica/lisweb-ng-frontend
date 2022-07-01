import { Requisicao } from './../model/requisicao.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RequisicaoService {
  baseUrl = '/requisicoes';

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

  create(requisicao: Requisicao): Observable<Requisicao> {
    return this.http.post<Requisicao>(this.baseUrl, requisicao);
  }

  read(): Observable<Requisicao[]> {
    return this.http.get<Requisicao[]>(this.baseUrl);
  }

  readById(id: number): Observable<Requisicao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Requisicao>(url);
  }

  update(requisicao: Requisicao): Observable<Requisicao> {
    const url = `${this.baseUrl}/${requisicao.id}`;
    return this.http.put<Requisicao>(url, requisicao);
  }

  delete(id: number): Observable<Requisicao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Requisicao>(url);
  }

  findRequisicoes(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Requisicao[]> {
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

    return this.http.get<Requisicao[]>(this.baseUrl, {
      params,
    });
  }

  countRequisicoes(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
