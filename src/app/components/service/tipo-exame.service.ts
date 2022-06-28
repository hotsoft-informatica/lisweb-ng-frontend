import { TipoExame } from './../model/tipo-exame.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TipoExameService {
  baseUrl = 'http://127.0.0.1:3010/tipos_exame';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(tipoExame: TipoExame): Observable<TipoExame> {
    return this.http.post<TipoExame>(this.baseUrl, tipoExame);
  }

  read(): Observable<TipoExame[]> {
    return this.http.get<TipoExame[]>(this.baseUrl);
  }

  readById(id: number): Observable<TipoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<TipoExame>(url);
  }

  update(tipoExame: TipoExame): Observable<TipoExame> {
    const url = `${this.baseUrl}/${tipoExame.id}`;
    return this.http.put<TipoExame>(url, tipoExame);
  }

  delete(id: number): Observable<TipoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<TipoExame>(url);
  }

  findTipoExames(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<TipoExame[]> {
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

    return this.http.get<TipoExame[]>(this.baseUrl, {
      params,
    });
  }

  countTipoExames(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
