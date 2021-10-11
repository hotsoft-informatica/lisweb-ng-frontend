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

  read(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.baseUrl);
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

  findPacientes(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Paciente[]> {
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

    return this.http.get<Paciente[]>(this.baseUrl, {
      params,
    });
  }

  countPacientes(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
