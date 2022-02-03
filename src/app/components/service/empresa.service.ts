import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empresa } from '../model/empresa.model';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  baseUrl = 'http://127.0.0.1:3010/empresas';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(empresa: Empresa): Observable<Empresa> {
    empresa.laboratorio_id = 2; // TODO pegar id da emresa do laboratório logado na sessão.
    return this.http.post<Empresa>(this.baseUrl, empresa);
  }

  read(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.baseUrl);
  }

  readById(id: number): Observable<Empresa> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Empresa>(url);
  }

  update(empresa: Empresa): Observable<Empresa> {
    const url = `${this.baseUrl}/${empresa.id}`;
    return this.http.put<Empresa>(url, empresa);
  }

  delete(id: number): Observable<Empresa> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Empresa>(url);
  }

  findEmpresas(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Empresa[]> {
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

    return this.http.get<Empresa[]>(this.baseUrl, {
      params,
    });
  }

  countEmpresas(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}