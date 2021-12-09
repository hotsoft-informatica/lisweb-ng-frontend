import { Bancada } from '../model/bancada.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BancadaService {
  baseUrl = 'http://127.0.0.1:3010/bancadas';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(bancada: Bancada): Observable<Bancada> {
    return this.http.post<Bancada>(this.baseUrl, bancada);
  }

  read(): Observable<Bancada[]> {
    return this.http.get<Bancada[]>(this.baseUrl);
  }

  readById(id: number): Observable<Bancada> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Bancada>(url);
  }

  update(bancada: Bancada): Observable<Bancada> {
    const url = `${this.baseUrl}/${bancada.id}`;
    return this.http.put<Bancada>(url, bancada);
  }

  delete(id: number): Observable<Bancada> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Bancada>(url);
  }

  findBancadas(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Bancada[]> {
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

    return this.http.get<Bancada[]>(this.baseUrl, {
      params,
    });
  }

  countBancadas(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
