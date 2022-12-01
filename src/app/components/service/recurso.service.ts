import { Recurso } from '../model/recurso.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { BackendIpService } from './backend-ip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RecursoService {
  baseUrl = '/recursos';

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

  create(recurso: Recurso): Observable<Recurso> {
    return this.http.post<Recurso>(this.baseUrl, recurso);
  }

  read(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(this.baseUrl);
  }

  readById(id: number): Observable<Recurso> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Recurso>(url);
  }

  update(recurso: Recurso): Observable<Recurso> {
    const url = `${this.baseUrl}/${recurso.id}`;
    return this.http.put<Recurso>(url, recurso);
  }

  delete(id: number): Observable<Recurso> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Recurso>(url);
  }

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Recurso[]> {
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

    return this.http.get<Recurso[]>(this.baseUrl, {
      params,
    });
  }

  countRegisters(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
