import { BackendIpService } from './backend-ip.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs';
import { ParametroVersaoExame } from '../model/parametro-versao-exame.model';
import { Query } from './../model/query.model';
@Injectable({
  providedIn: 'root',
})

export class ParametroVersaoExameService {
  baseUrl = '/parametros_versao_exame';
  query: Query[] = [];
  storage: Storage = window.localStorage;
  versaoExameUrl: string = '';

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
    this.versaoExameUrl = backendIpService.getUrl() + '/versoes_exame';
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(parametroVersaoExame: ParametroVersaoExame): Observable<ParametroVersaoExame> {
    return this.http.post<ParametroVersaoExame>(this.baseUrl, parametroVersaoExame);
  }

  read(): Observable<ParametroVersaoExame[]> {
    return this.http.get<ParametroVersaoExame[]>(this.baseUrl);
  }

  readById(id: number): Observable<ParametroVersaoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ParametroVersaoExame>(url);
  }

  updateAll(parametrosVersaoExame: ParametroVersaoExame[]) {
    parametrosVersaoExame?.forEach((parametroVersaoExame) => {
      if (parametroVersaoExame) {
        this.update(parametroVersaoExame).subscribe((parametroVersaoExame) => { })
      }
    });
    return parametrosVersaoExame;
  }

  update(parametroVersaoExame: ParametroVersaoExame): Observable<ParametroVersaoExame> {
    const url = `${this.baseUrl}/${parametroVersaoExame.id}`;
    return this.http.put<ParametroVersaoExame>(url, parametroVersaoExame);
  }

  delete(id: number): Observable<ParametroVersaoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ParametroVersaoExame>(url);
  }

  getByVersaoExameId(versaoExameId: number): Observable<ParametroVersaoExame[]> {
    const url = `${this.versaoExameUrl}/${versaoExameId}/parametros`;
    return this.http.get<ParametroVersaoExame[]>(url);
  }

  findParametroVersaoExames(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<ParametroVersaoExame[]> {
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
    return this.http.get<ParametroVersaoExame[]>(this.baseUrl, {
      params: params,
    });
  }

  countParametroVersaoExames(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
