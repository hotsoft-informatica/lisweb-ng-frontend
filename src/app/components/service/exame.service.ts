import { Exame } from './../model/exame.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ExameService {
  baseUrl = '/exames';

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = this.backendIpService.getUrl() + this.baseUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(exame: Exame): Observable<Exame> {
    return this.http.post<Exame>(this.baseUrl, exame);
  }

  read(): Observable<Exame[]> {
    return this.http.get<Exame[]>(this.baseUrl);
  }

  readById(id: number): Observable<Exame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Exame>(url);
  }

  update(exame: Exame): Observable<Exame> {
    const url = `${this.baseUrl}/${exame.id}`;
    return this.http.put<Exame>(url, exame);
  }

  delete(id: number): Observable<Exame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Exame>(url);
  }

  findExames(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Exame[]> {
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

    return this.http.get<Exame[]>(this.baseUrl, {
      params,
    });
  }

  countExames(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
