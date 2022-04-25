import { ResponsavelTecnico } from '../model/responsavel-tecnico.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ResponsavelTecnicoService {
  baseUrl = 'http://127.0.0.1:3010/responsaveis_tecnico';

  query: Query[] = [];

  selectedFile!: File;
  fileName: string = '';

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(responsavel_tecnico: ResponsavelTecnico): Observable<ResponsavelTecnico> {
    return this.http.post<ResponsavelTecnico>(this.baseUrl, responsavel_tecnico);
  }

  read(): Observable<ResponsavelTecnico[]> {
    return this.http.get<ResponsavelTecnico[]>(this.baseUrl);
  }

  readById(id: number): Observable<ResponsavelTecnico> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ResponsavelTecnico>(url);
  }

  update(responsavel_tecnico: ResponsavelTecnico): Observable<ResponsavelTecnico> {
    const url = `${this.baseUrl}/${responsavel_tecnico.id}`;
    return this.http.put<ResponsavelTecnico>(url, responsavel_tecnico);
  }

  delete(id: number): Observable<ResponsavelTecnico> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ResponsavelTecnico>(url);
  }

  findResponsavelTecnico(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<ResponsavelTecnico[]> {
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

    return this.http.get<ResponsavelTecnico[]>(this.baseUrl, {
      params,
    });
  }

  countResponsavelTecnico(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }

  upload(file: FormData, responsavel_tecnico: ResponsavelTecnico): Observable<any> {
    const url = this.baseUrl + '/' + responsavel_tecnico.id + '/upload'
    return this.http.post<FormData>(url, file);
  }
}
