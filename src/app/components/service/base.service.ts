import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';
import { Query } from './../model/query.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  baseUrl: string = '/';
  endpoint : string = '/';

  constructor(
    @Inject(Injector) public injector: Injector,
    public http: HttpClient) { }

  private get defaultService() {
    return this.injector.get(DefaultService);
  }

  showMessage(msg: string): void {
    this.defaultService.showMessage(msg);
  }

  create(record: any, endpoint: string = this.endpoint): Observable<any> {
    return this.defaultService.create(record, endpoint);
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    pageNumber = 1,
    pageSize = 3,
    queries: Query[] = [],
    endpoint: string = this.endpoint
  ): Observable<any[]> {
    return this.defaultService.read(
      sortActive, sortDirection, pageNumber, pageSize, queries, endpoint
    );
  }

  readById(id: number, endpoint: string = this.endpoint): Observable<any> {
    return this.defaultService.readById(id, endpoint);
  }

  update(record: any, endpoint: string = this.endpoint): Observable<any> {
    return this.defaultService.update(record, endpoint);
  }

  delete(id: number, endpoint: string = this.endpoint): Observable<any> {
    return this.defaultService.delete(id, endpoint);
  }

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null,
    endpoint: string = this.endpoint
  ): Observable<any[]> {
    return this.defaultService.find(
      active, sortOrder, pageNumber, pageSize, query, endpoint
    );
  }

  count(endpoint: string = this.endpoint): Observable<number> {
    return this.defaultService.count(endpoint);
  }
}
