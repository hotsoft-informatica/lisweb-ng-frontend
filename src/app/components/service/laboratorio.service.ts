import { BaseService } from './base.service';
import { Injectable, Inject, Injector } from '@angular/core';
import { Query } from './../model/query.model';
import { Laboratorio } from '../model/laboratorio.model';
import { BackendIpService } from './backend-ip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, of, map, pipe } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class LaboratorioService extends BaseService {
  associationUrl = '/laboratorios_dominio';
  baseUrl = '/laboratorios';
  storage: Storage = window.localStorage;
  query: Query[] = [];
  labDomains = [];

  constructor(
    private snackbar: MatSnackBar,
    @Inject(Injector) public injector: Injector,
    public http: HttpClient,
    private backendIpService: BackendIpService) {
      super(injector, http);
      this.endpoint = 'laboratorios'
      this.baseUrl = backendIpService.getUrl() + this.baseUrl;
      this.associationUrl = backendIpService.getUrl() + this.associationUrl;
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

  create(laboratorio: Laboratorio): Observable<Laboratorio> {
    return this.http.post<Laboratorio>(this.baseUrl, laboratorio);
  }

  read(): Observable<Laboratorio[]> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

    return this.http.get<Laboratorio[]>(this.baseUrl, { headers: headers });
  }

  readById(id: number): Observable<Laboratorio> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Laboratorio>(url);
  }

  getAssocLabId(id: number): Observable<Laboratorio[]> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

    const url = `${this.associationUrl}/${id}`;
    console.log(url);
    return this.http.get<Laboratorio[]>(url, {headers: headers});
  }

  update(laboratorio: Laboratorio): Observable<Laboratorio> {
    const url = `${this.baseUrl}/${laboratorio.id}`;
    return this.http.put<Laboratorio>(url, laboratorio);
  }

  delete(id: number): Observable<Laboratorio> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Laboratorio>(url);
  }

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Laboratorio[]> {

    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders()
      .set('Authorization', auth);

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

    return this.http.get<Laboratorio[]>(this.baseUrl, {
      params: params,
      headers: headers
    });
  }

  countLaboratorios(): Observable<number> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders()
      .set('Authorization', auth);

    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
      headers: headers
    });
  }
}

