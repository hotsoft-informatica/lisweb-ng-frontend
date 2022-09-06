import { MetodoExame } from '../model/metodo-exame.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MetodoExameService {
  baseUrl = '/metodos_exame';

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private backendIpService: BackendIpService,
    private http: HttpClient,
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

  create(metodoExame: MetodoExame): Observable<MetodoExame> {
    return this.http.post<MetodoExame>(this.baseUrl, metodoExame);
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    pageNumber = 0,
    pageSize = 3,
    queries: Query[]): Observable<MetodoExame[]> { // criando parametros e puxando dados do backend
    let params = new HttpParams(); // cria paramaetros para leitura do backend

    queries.forEach(busca => {
      params = params.append(busca.key, busca.value); // comunicação com backend key=busca value=valor do item
    });
    params = params.append('sortActive', sortActive); // Qual coluna sera ordenada
    params = params.append('sortDirection', sortDirection); // Ordem desc ou asc
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    queries?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<MetodoExame[]>(this.baseUrl, { params }); // Passa qual operação sera realizada pelo backend
  }

  readById(id: number): Observable<MetodoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<MetodoExame>(url);
  }

  update(metodoExame: MetodoExame): Observable<MetodoExame> {
    const url = `${this.baseUrl}/${metodoExame.id}`;
    return this.http.put<MetodoExame>(url, metodoExame);
  }

  delete(id: number): Observable<MetodoExame> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<MetodoExame>(url);
  }

  findMetodoExames(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<MetodoExame[]> {
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

    return this.http.get<MetodoExame[]>(this.baseUrl, {
      params,
    });
  }

  countMetodoExame(): Observable<number> {
    let params = new HttpParams().set('totalCount', 'true');
    return this.http.get<number>(this.baseUrl, {
      params
    });
  }
}
