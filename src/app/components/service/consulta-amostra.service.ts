import { ConsultaAmostra } from '../model/consulta-amostra.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ConsultaAmostraService {
  baseUrl = 'http://127.0.0.1:3010/amostras';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  findConsultaAmostra(query: Query[] | null): Observable<ConsultaAmostra[]> {
    let params = new HttpParams();
    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<ConsultaAmostra[]>(this.baseUrl, {
      params,
    });
  }
}
