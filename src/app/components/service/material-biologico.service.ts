import { MaterialBiologico } from './../model/material-biologico.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MaterialBiologicoService {
  baseUrl = 'http://127.0.0.1:3010/material-biologicos';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(materialBiologico: MaterialBiologico): Observable<MaterialBiologico> {
    return this.http.post<MaterialBiologico>(this.baseUrl, materialBiologico);
  }

  read(): Observable<MaterialBiologico[]> {
    return this.http.get<MaterialBiologico[]>(this.baseUrl);
  }

  readById(id: number): Observable<MaterialBiologico> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<MaterialBiologico>(url);
  }

  update(materialBiologico: MaterialBiologico): Observable<MaterialBiologico> {
    const url = `${this.baseUrl}/${materialBiologico.id}`;
    return this.http.put<MaterialBiologico>(url, materialBiologico);
  }

  delete(id: number): Observable<MaterialBiologico> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<MaterialBiologico>(url);
  }

  findMaterialBiologicos(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<MaterialBiologico[]> {
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

    return this.http.get<MaterialBiologico[]>(this.baseUrl, {
      params,
    });
  }

  countMaterialBiologicos(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
