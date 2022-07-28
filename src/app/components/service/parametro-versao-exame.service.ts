import { ParametroVersaoExame } from '../model/parametro-versao-exame.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VersaoExame } from '../model/versao-exame.model';
@Injectable({
  providedIn: 'root',
})
export class ParametroVersaoExameService {
  baseUrl = '/parametros_versao_exame';
  versaoExameUrl: string = '';

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
    this.versaoExameUrl = backendIpService.getUrl() + 'versoes_exame';
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
      params,
    });
  }

  countParametroVersaoExames(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
