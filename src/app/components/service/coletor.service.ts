import { Coletor } from '../model/coletor.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ColetorService {
  baseUrl = 'http://127.0.0.1:3010/coletores';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(coletor: Coletor): Observable<Coletor> {
    return this.http.post<Coletor>(this.baseUrl, coletor);
  }

  read(): Observable<Coletor[]> {
    return this.http.get<Coletor[]>(this.baseUrl);
  }

  readById(id: number): Observable<Coletor> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Coletor>(url);
  }

  update(coletor: Coletor): Observable<Coletor> {
    const url = `${this.baseUrl}/${coletor.id}`;
    return this.http.put<Coletor>(url, coletor);
  }

  delete(id: number): Observable<Coletor> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Coletor>(url);
  }

  findColetores(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Coletor[]> {
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

    return this.http.get<Coletor[]>(this.baseUrl, {
      params,
    });
  }

  countColetores(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
