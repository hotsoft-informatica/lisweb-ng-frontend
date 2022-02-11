import { Paciente } from '../model/paciente.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  baseUrl = 'http://127.0.0.1:3010/pacientes';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.baseUrl, paciente);
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    pageNumber = 1,
    pageSize = 3,
    queries: Query[]
  ): Observable<Paciente[]> {
    // criando parametros e puxando dados do backend
    let params = new HttpParams(); // cria paramaetros para leitura do backend

    queries.forEach((busca) => {
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

    return this.http.get<Paciente[]>(this.baseUrl, { params }); // Passa qual operação sera realizada pelo backend
  }

  readById(id: number): Observable<Paciente> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Paciente>(url);
  }

  update(paciente: Paciente): Observable<Paciente> {
    const url = `${this.baseUrl}/${paciente.id}`;
    return this.http.put<Paciente>(url, paciente);
  }

  delete(id: number): Observable<Paciente> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Paciente>(url);
  }

  countPacientes(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
