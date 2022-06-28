import { VersaoExame } from './../model/versao-exame.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class VersaoExameService {
  // TODO: Corrigir pluralizacao de versoes exame
  baseUrl = 'http://127.0.0.1:3010/versoes_exame';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(versaoExame: VersaoExame): Observable<VersaoExame> {
    return this.http.post<VersaoExame>(this.baseUrl, versaoExame);
  }

  read(): Observable<VersaoExame[]> {
    return this.http.get<VersaoExame[]>(this.baseUrl);
  }

  readById(id: number): Observable<VersaoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<VersaoExame>(url);
  }

  update(versaoExame: VersaoExame): Observable<VersaoExame> {
    const url = `${this.baseUrl}/${versaoExame.id}`;
    return this.http.put<VersaoExame>(url, versaoExame);
  }

  delete(id: number): Observable<VersaoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<VersaoExame>(url);
  }

  findVersaoExames(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<VersaoExame[]> {
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

    return this.http.get<VersaoExame[]>(this.baseUrl, {
      params,
    });
  }

  countVersaoExames(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}

