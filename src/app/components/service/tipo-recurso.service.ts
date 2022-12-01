import { BackendIpService } from './backend-ip.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Query } from './../model/query.model';
import { TipoRecurso } from '../model/tipo-recurso.model';
@Injectable({
  providedIn: 'root',
})
export class TipoRecursoService {
  baseUrl = '/tipos_recurso';

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(tipoRecurso: TipoRecurso): Observable<TipoRecurso> {
    return this.http.post<TipoRecurso>(this.baseUrl, tipoRecurso);
  }

  read(): Observable<TipoRecurso[]> {
    return this.http.get<TipoRecurso[]>(this.baseUrl);
  }

  readById(id: number): Observable<TipoRecurso> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<TipoRecurso>(url);
  }

  update(tipoRecurso: TipoRecurso): Observable<TipoRecurso> {
    const url = `${this.baseUrl}/${tipoRecurso.id}`;
    return this.http.put<TipoRecurso>(url, tipoRecurso);
  }

  delete(id: number): Observable<TipoRecurso> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<TipoRecurso>(url);
  }

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<TipoRecurso[]> {
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

    return this.http.get<TipoRecurso[]>(this.baseUrl, {
      params,
    });
  }

  countRegisters(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
