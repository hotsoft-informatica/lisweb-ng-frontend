import { Bandeja } from '../model/bandeja.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BandejaService {
  baseUrl = 'http://127.0.0.1:3010/bandejas';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(bandeja: Bandeja): Observable<Bandeja> {
    return this.http.post<Bandeja>(this.baseUrl, bandeja);
  }

  read(): Observable<Bandeja[]> {
    return this.http.get<Bandeja[]>(this.baseUrl);
  }

  readById(id: number): Observable<Bandeja> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Bandeja>(url);
  }

  update(bandeja: Bandeja): Observable<Bandeja> {
    const url = `${this.baseUrl}/${bandeja.id}`;
    return this.http.put<Bandeja>(url, bandeja);
  }

  delete(id: number): Observable<Bandeja> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Bandeja>(url);
  }

  findBandejas(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Bandeja[]> {
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

    return this.http.get<Bandeja[]>(this.baseUrl, {
      params,
    });
  }

  countBandejas(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
