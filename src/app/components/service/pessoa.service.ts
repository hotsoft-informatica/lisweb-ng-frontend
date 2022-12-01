import { Query } from '../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pessoa } from '../model/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  baseUrl = '/pessoas';
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

  create(record: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.baseUrl, record);
  }

  readById(id: number): Observable<Pessoa> {
    if (id > 0) {
      const url = `${this.baseUrl}/${id}`;
      return this.http.get<Pessoa>(url);
    } else {
      return new Observable<Pessoa>();
    }
  }

  update(record: Pessoa): Observable<Pessoa> {
    const url = `${this.baseUrl}/${record.id}`;
    return this.http.put<Pessoa>(url, record);
  }

  delete(id: number): Observable<Pessoa> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Pessoa>(url);
  }

  count(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    queries: Query[]): Observable<Pessoa[]> {
    let params = new HttpParams();

    queries.forEach(busca => {
      params = params.append(busca.key, busca.value);
    });
    params = params.append('sortActive', sortActive);
    params = params.append('sortDirection', sortDirection);

    queries?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<Pessoa[]>(this.baseUrl, { params });
  }
}
