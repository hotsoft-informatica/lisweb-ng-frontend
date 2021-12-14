import { ExameAmostra } from './../model/exame-amostra.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ExameAmostraService {
  baseUrl = 'http://127.0.0.1:3010/exames_amostras';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(exameAmostra: ExameAmostra): Observable<ExameAmostra> {
    return this.http.post<ExameAmostra>(this.baseUrl, exameAmostra);
  }

  read(): Observable<ExameAmostra[]> {
    return this.http.get<ExameAmostra[]>(this.baseUrl);
  }

  readById(id: number): Observable<ExameAmostra> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ExameAmostra>(url);
  }

  update(exameAmostra: ExameAmostra): Observable<ExameAmostra> {
    const url = `${this.baseUrl}/${exameAmostra.id}`;
    return this.http.put<ExameAmostra>(url, exameAmostra);
  }

  delete(id: number): Observable<ExameAmostra> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ExameAmostra>(url);
  }

  findExameAmostras(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<ExameAmostra[]> {
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

    return this.http.get<ExameAmostra[]>(this.baseUrl, {
      params,
    });
  }

  countExameAmostras(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
