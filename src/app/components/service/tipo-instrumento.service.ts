import { TipoInstrumento } from '../model/tipo-instrumento.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TipoInstrumentoService {
  baseUrl = 'http://127.0.0.1:3010/tipo_instrumentos';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(tipoExame: TipoInstrumento): Observable<TipoInstrumento> {
    return this.http.post<TipoInstrumento>(this.baseUrl, tipoExame);
  }

  read(): Observable<TipoInstrumento[]> {
    return this.http.get<TipoInstrumento[]>(this.baseUrl);
  }

  readById(id: number): Observable<TipoInstrumento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<TipoInstrumento>(url);
  }

  update(tipoExame: TipoInstrumento): Observable<TipoInstrumento> {
    const url = `${this.baseUrl}/${tipoExame.id}`;
    return this.http.put<TipoInstrumento>(url, tipoExame);
  }

  delete(id: number): Observable<TipoInstrumento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<TipoInstrumento>(url);
  }

  findTipoInstrumentos(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<TipoInstrumento[]> {
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

    return this.http.get<TipoInstrumento[]>(this.baseUrl, {
      params,
    });
  }

  countTipoInstrumentos(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
