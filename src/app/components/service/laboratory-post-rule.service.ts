import { LaboratoryPostRule } from '../model/laboratory-post-rule.model';
import { Query } from '../model/query.model';
import { Injectable } from '@angular/core';
import { BackendIpService } from './backend-ip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LaboratoryPostRuleService {
  baseUrl = '/laboratory_post_rules';

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

  create(dominio: LaboratoryPostRule): Observable<LaboratoryPostRule> {
    return this.http.post<LaboratoryPostRule>(this.baseUrl, dominio);
  }

  read(): Observable<LaboratoryPostRule[]> {
    return this.http.get<LaboratoryPostRule[]>(this.baseUrl);
  }

  readById(id: number): Observable<LaboratoryPostRule> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<LaboratoryPostRule>(url);
  }

  update(dominio: LaboratoryPostRule): Observable<LaboratoryPostRule> {
    const url = `${this.baseUrl}/${dominio.id}`;
    return this.http.put<LaboratoryPostRule>(url, dominio);
  }

  delete(id: number): Observable<LaboratoryPostRule> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<LaboratoryPostRule>(url);
  }

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<LaboratoryPostRule[]> {
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

    return this.http.get<LaboratoryPostRule[]>(this.baseUrl, {
      params,
    });
  }

  countLaboratoryPostRules(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
