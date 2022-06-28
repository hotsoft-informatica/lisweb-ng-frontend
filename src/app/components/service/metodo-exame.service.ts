import { MetodoExame } from '../model/metodo-exame.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MetodoExameService {
  baseUrl = 'http://127.0.0.1:3010/metodos_exame';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(metodoExame: MetodoExame): Observable<MetodoExame> {
    return this.http.post<MetodoExame>(this.baseUrl, metodoExame);
  }

  read(): Observable<MetodoExame[]> {
    return this.http.get<MetodoExame[]>(this.baseUrl);
  }

  readById(id: number): Observable<MetodoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<MetodoExame>(url);
  }

  update(metodoExame: MetodoExame): Observable<MetodoExame> {
    const url = `${this.baseUrl}/${metodoExame.id}`;
    return this.http.put<MetodoExame>(url, metodoExame);
  }

  delete(id: number): Observable<MetodoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<MetodoExame>(url);
  }

  findMetodoExames(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<MetodoExame[]> {
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

    return this.http.get<MetodoExame[]>(this.baseUrl, {
      params,
    });
  }

  countTipoExames(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
