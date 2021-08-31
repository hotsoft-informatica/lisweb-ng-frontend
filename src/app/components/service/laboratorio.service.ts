import { Query } from './../model/query.model';
import { Laboratorio } from '../model/laboratorio.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { query } from '@angular/animations';
import { PipeTransform, Pipe } from '@angular/core';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class LaboratorioService {
  baseUrl = 'http://127.0.0.1:3010/laboratorios';
  filter!: Iterable<unknown> | ArrayLike<unknown>;

  query: Query[] = [];

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
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Laboratorio[]> {
    let params = new HttpParams()
      .set('active', active)
      .set('sortOrder', sortOrder)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}_contains]`
        params = params.append(key, queryItem.value);
      }
    });

    // q[name_contains]='teste'&q[serie_equals]=2001&


    // if (filter) {
    //   filter.forEach(([key, value]) => {
    //     .set('key', value.toString());
    //   });
    // } else {
    //   .set("q[" + key + "]", value);
    // }

    // filter?.forEach(.set("q[" + key + "]", value))

    //.set("q["+key+"]", value)
    // iterar o array de query .set("q["+key+"]", value),
    //params.set('xxx', 'yyy');
    return this.http.get<Laboratorio[]>(this.baseUrl, {
      params,
    });
    // console.table(Array.from(this.filter))
  }

  countLaboratorios(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
