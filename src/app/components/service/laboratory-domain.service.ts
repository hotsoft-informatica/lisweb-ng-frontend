import { Query } from '../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendIpService } from '../service/backend-ip.service';
import { LaboratoryDomain } from '../model/laboratory-domain.model';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LaboratoryDomainService {
  baseUrl = '/laboratory_domains';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient, private backendIpService: BackendIpService) {
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(laboratoryDomain: LaboratoryDomain): Observable<LaboratoryDomain> {
    return this.http.post<LaboratoryDomain>(this.baseUrl, laboratoryDomain);
  }

  read(): Observable<LaboratoryDomain[]> {
    return this.http.get<LaboratoryDomain[]>(this.baseUrl);
  }

  readById(id: number): Observable<LaboratoryDomain> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<LaboratoryDomain>(url);
  }

  update(laboratoryDomain: LaboratoryDomain): Observable<LaboratoryDomain> {
    const url = `${this.baseUrl}/${laboratoryDomain.id}`;
    return this.http.put<LaboratoryDomain>(url, laboratoryDomain);
  }

  delete(id: number): Observable<LaboratoryDomain> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<LaboratoryDomain>(url);
  }

  findLaboratoryDomains(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<LaboratoryDomain[]> {
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

    return this.http.get<LaboratoryDomain[]>(this.baseUrl, {
      params,
    });
  }

  countLaboratoryDomains(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
