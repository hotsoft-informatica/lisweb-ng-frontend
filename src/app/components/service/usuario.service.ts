import { Usuario } from './../model/usuario.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl = 'http://127.0.0.1:3010/usuarios';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  read(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  readById(id: number): Observable<Usuario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Usuario>(url);
  }

  update(usuario: Usuario): Observable<Usuario> {
    const url = `${this.baseUrl}/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  delete(id: number): Observable<Usuario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Usuario>(url);
  }

  findUsuarios(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Usuario[]> {
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

    return this.http.get<Usuario[]>(this.baseUrl, {
      params,
    });
  }

  countUsuarios(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
