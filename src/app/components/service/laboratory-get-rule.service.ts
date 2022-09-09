import { LaboratoryGetRule } from '../model/laboratory-get-rule.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { BackendIpService } from './backend-ip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LaboratoryGetRuleService {
  baseUrl = '/laboratory_get_rules';

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

  create(dominio: LaboratoryGetRule): Observable<LaboratoryGetRule> {
    return this.http.post<LaboratoryGetRule>(this.baseUrl, dominio);
  }

  read(): Observable<LaboratoryGetRule[]> {
    return this.http.get<LaboratoryGetRule[]>(this.baseUrl);
  }

  readById(id: number): Observable<LaboratoryGetRule> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<LaboratoryGetRule>(url);
  }

  update(dominio: LaboratoryGetRule): Observable<LaboratoryGetRule> {
    const url = `${this.baseUrl}/${dominio.id}`;
    return this.http.put<LaboratoryGetRule>(url, dominio);
  }

  delete(id: number): Observable<LaboratoryGetRule> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<LaboratoryGetRule>(url);
  }

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<LaboratoryGetRule[]> {
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

    return this.http.get<LaboratoryGetRule[]>(this.baseUrl, {
      params,
    });
  }

  countLaboratoryGetRules(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
