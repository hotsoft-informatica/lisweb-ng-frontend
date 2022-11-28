import { Query } from './../model/query.model';
import { LaboratoryGetFilter } from '../model/laboratory-get-filter.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { EMPTY, Observable, of, map, pipe } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LaboratoryGetFilterService {
  baseUrl = '/laboratory_get_filters';

  query: Query[] = [];
  labDomains = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
  }

  getData() {
    return this.labDomains.length ? of(this.labDomains)
      : this.http.get<any>('baseUrl')
        .pipe(
          map((data) => {
            this.labDomains = data.values;
            return this.labDomains;
          })
        )
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(laboratorio_get_filter: LaboratoryGetFilter): Observable<LaboratoryGetFilter> {
    return this.http.post<LaboratoryGetFilter>(this.baseUrl, laboratorio_get_filter);
  }

  read(): Observable<LaboratoryGetFilter[]> {
    return this.http.get<LaboratoryGetFilter[]>(this.baseUrl);
  }

  readById(id: number): Observable<LaboratoryGetFilter> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<LaboratoryGetFilter>(url);
  }

  update(laboratorio_get_filter: LaboratoryGetFilter): Observable<LaboratoryGetFilter> {
    const url = `${this.baseUrl}/${laboratorio_get_filter.id}`;
    return this.http.put<LaboratoryGetFilter>(url, laboratorio_get_filter);
  }

  delete(id: number): Observable<LaboratoryGetFilter> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<LaboratoryGetFilter>(url);
  }

  findLaboratoryGetFilters(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<LaboratoryGetFilter[]> {
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

    return this.http.get<LaboratoryGetFilter[]>(this.baseUrl, {
      params,
    });
  }

  countLaboratoryGetFilter(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
