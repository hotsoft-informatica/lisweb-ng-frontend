import { Query } from '../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';import { BackendIpService } from './backend-ip.service';
import { ClientServerTable } from '../model/client-server-table.model';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ClientServerTableService {
  baseUrl = '/client_server_tables';

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

  create(clientServerTable: ClientServerTable): Observable<ClientServerTable> {
    return this.http.post<ClientServerTable>(this.baseUrl, clientServerTable);
  }

  read(): Observable<ClientServerTable[]> {
    return this.http.get<ClientServerTable[]>(this.baseUrl);
  }

  readById(id: number): Observable<ClientServerTable> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ClientServerTable>(url);
  }

  update(clientServerTable: ClientServerTable): Observable<ClientServerTable> {
    const url = `${this.baseUrl}/${clientServerTable.id}`;
    return this.http.put<ClientServerTable>(url, clientServerTable);
  }

  delete(id: number): Observable<ClientServerTable> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ClientServerTable>(url);
  }

  findClientServerTables(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<ClientServerTable[]> {
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

    return this.http.get<ClientServerTable[]>(this.baseUrl, {
      params,
    });
  }

  countClientServerTables(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
