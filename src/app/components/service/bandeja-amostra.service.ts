import { BandejaAmostra } from '../model/bandeja-amostra.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BandejaAmostraService {
  baseUrl = '/bandeja-amostras';

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

  create(bandejaAmostra: BandejaAmostra): Observable<BandejaAmostra> {
    return this.http.post<BandejaAmostra>(this.baseUrl, bandejaAmostra);
  }

  read(): Observable<BandejaAmostra[]> {
    return this.http.get<BandejaAmostra[]>(this.baseUrl);
  }

  readById(id: number): Observable<BandejaAmostra> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<BandejaAmostra>(url);
  }

  update(bandejaAmostra: BandejaAmostra): Observable<BandejaAmostra> {
    const url = `${this.baseUrl}/${bandejaAmostra.id}`;
    return this.http.put<BandejaAmostra>(url, bandejaAmostra);
  }

  delete(id: number): Observable<BandejaAmostra> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<BandejaAmostra>(url);
  }

  findBandejaAmostras(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<BandejaAmostra[]> {
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

    return this.http.get<BandejaAmostra[]>(this.baseUrl, {
      params,
    });
  }

  countBandejaAmostras(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
