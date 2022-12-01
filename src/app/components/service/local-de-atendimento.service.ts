import { LocalDeAtendimento } from '../model/local-de-atendimento.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LocalDeAtendimentoService {
  baseUrl = '/locais_atendimento';

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

  create(paciente: LocalDeAtendimento): Observable<LocalDeAtendimento> {
    return this.http.post<LocalDeAtendimento>(this.baseUrl, paciente);
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    pageNumber = 1,
    pageSize = 3,
    queries: Query[]): Observable<LocalDeAtendimento[]> { // criando parametros e puxando dados do backend
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

    return this.http.get<LocalDeAtendimento[]>(this.baseUrl, { params }); // Passa qual operação sera realizada pelo backend
  }

  readById(id: number): Observable<LocalDeAtendimento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<LocalDeAtendimento>(url);
  }

  update(localdeatendimento: LocalDeAtendimento): Observable<LocalDeAtendimento> {
    const url = `${this.baseUrl}/${localdeatendimento.id}`;
    return this.http.put<LocalDeAtendimento>(url, localdeatendimento);
  }

  delete(id: number): Observable<LocalDeAtendimento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<LocalDeAtendimento>(url);
  }

  countLocaisdeAtendimentos(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
