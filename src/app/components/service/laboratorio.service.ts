import { Laboratorio } from '../model/laboratorio.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LaboratorioService {
  baseUrl = 'http://127.0.0.1:3010/laboratorios';

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  read(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.baseUrl);
  }

  readById(id: number): Observable<Laboratorio> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Laboratorio>(url);
  }

  create(laboratorio: Laboratorio): Observable<Laboratorio> {
    return this.http.post<Laboratorio>(this.baseUrl, laboratorio);
  }

  update(laboratorio: Laboratorio): Observable<Laboratorio> {
    const url = `${this.baseUrl}/${laboratorio.id}`;
    return this.http.put<Laboratorio>(url, laboratorio);
  }

  delete(id: number): Observable<Laboratorio> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Laboratorio>(url);
  }

  findLaboratorios(
    active = '',
    sortOrder = 'asc',
    pageNumber = 1,
    pageSize = 3,
    filter = ''
  ): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.baseUrl, {
      params: new HttpParams()
        .set('active', active)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('filter', filter),
    });
  }

  countLaboratorios(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
