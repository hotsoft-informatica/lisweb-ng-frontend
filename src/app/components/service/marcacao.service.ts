import { Marcacao } from '../model/marcacao.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MarcacaoService {
  // TODO: Corrigir pluralizacao de versoes exame
  baseUrl = '/marcacoes';

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

  create(marcacao: Marcacao): Observable<Marcacao> {
    return this.http.post<Marcacao>(this.baseUrl, marcacao);
  }

  read(): Observable<Marcacao[]> {
    return this.http.get<Marcacao[]>(this.baseUrl);
  }

  update(marcacao: Marcacao): Observable<Marcacao> {
    const url = `${this.baseUrl}/${marcacao.id}`;
    return this.http.put<Marcacao>(url, marcacao);
  }

  readById(id: number): Observable<Marcacao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Marcacao>(url);
  }

  findMarcacoes(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Marcacao[]> {
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

    return this.http.get<Marcacao[]>(this.baseUrl, {
      params,
    });
  }

  countMarcacaoes(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
