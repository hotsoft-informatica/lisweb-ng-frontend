import { AtributoExame } from '../model/atributo-exame.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AtributoExameService {
  baseUrl = '/atributos_exame';

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

  create(atributoExame: AtributoExame): Observable<AtributoExame> {
    return this.http.post<AtributoExame>(this.baseUrl, atributoExame);
  }

  read(): Observable<AtributoExame[]> {
    return this.http.get<AtributoExame[]>(this.baseUrl);
  }

  readById(id: number): Observable<AtributoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<AtributoExame>(url);
  }

  update(atributoExame: AtributoExame): Observable<AtributoExame> {
    const url = `${this.baseUrl}/${atributoExame.id}`;
    return this.http.put<AtributoExame>(url, atributoExame);
  }

  delete(id: number): Observable<AtributoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<AtributoExame>(url);
  }

  findAtributoExame(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<AtributoExame[]> {
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

    return this.http.get<AtributoExame[]>(this.baseUrl, {
      params,
    });
  }

  countAtributoExame(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
