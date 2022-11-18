import { Amostra } from '../model/amostra.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AmostraService {
  baseUrl = '/amostras';

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

  create(amostra: Amostra): Observable<Amostra> {
    return this.http.post<Amostra>(this.baseUrl, amostra);
  }

  read(): Observable<Amostra[]> {
    return this.http.get<Amostra[]>(this.baseUrl);
  }

  readById(id: number): Observable<Amostra> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Amostra>(url);
  }

  update(amostra: Amostra): Observable<Amostra> {
    const url = `${this.baseUrl}/${amostra.id}`;
    return this.http.put<Amostra>(url, amostra);
  }

  delete(id: number): Observable<Amostra> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Amostra>(url);
  }

  findAmostras(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Amostra[]> {
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

    return this.http.get<Amostra[]>(this.baseUrl, {
      params,
    });
  }

  countAmostras(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
