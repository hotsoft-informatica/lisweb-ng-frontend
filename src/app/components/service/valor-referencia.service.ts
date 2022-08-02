import { ValorReferencia } from '../model/valor-referencia.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ValorReferenciaService {
  // TODO: Corrigir pluralizacao de versoes exame
  baseUrl = '/valores_referencia';

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

  create(valorReferencia: ValorReferencia): Observable<ValorReferencia> {
    return this.http.post<ValorReferencia>(this.baseUrl, valorReferencia);
  }

  read(): Observable<ValorReferencia[]> {
    return this.http.get<ValorReferencia[]>(this.baseUrl);
  }

  update(valorReferencia: ValorReferencia): Observable<ValorReferencia> {
    const url = `${this.baseUrl}/${valorReferencia.id}`;
    return this.http.put<ValorReferencia>(url, valorReferencia);
  }

  delete(id: number): Observable<ValorReferencia> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ValorReferencia>(url);
  }

  readById(id: number): Observable<ValorReferencia> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ValorReferencia>(url);
  }

  findValorReferencia(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<ValorReferencia[]> {
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

    return this.http.get<ValorReferencia[]>(this.baseUrl, {
      params,
    });
  }

  countValoresReferencia(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
