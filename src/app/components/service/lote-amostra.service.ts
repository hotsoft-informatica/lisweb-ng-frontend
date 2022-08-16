import { LoteAmostras } from './../model/lote-amostra.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoteAmostraService {
  baseUrl = '/lote-amostras';

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

  create(loteAmostra: LoteAmostras): Observable<LoteAmostras> {
    return this.http.post<LoteAmostras>(this.baseUrl, loteAmostra);
  }

  read(): Observable<LoteAmostras[]> {
    return this.http.get<LoteAmostras[]>(this.baseUrl);
  }

  readById(id: number): Observable<LoteAmostras> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<LoteAmostras>(url);
  }

  update(loteAmostra: LoteAmostras): Observable<LoteAmostras> {
    const url = `${this.baseUrl}/${loteAmostra.id}`;
    return this.http.put<LoteAmostras>(url, loteAmostra);
  }

  delete(id: number): Observable<LoteAmostras> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<LoteAmostras>(url);
  }

  findLoteAmostras(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<LoteAmostras[]> {
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

    return this.http.get<LoteAmostras[]>(this.baseUrl, {
      params,
    });
  }

  countLoteAmostras(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
