import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';
import { Query } from './../model/query.model';
import { HttpClient } from '@angular/common/http';

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

  getBaseUrl(): string {
    return this.defaultService.getBaseUrl();
  }

  create(record: any, endpoint: string = this.endpoint): Observable<any> {
    return this.defaultService.create(record, endpoint);
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    pageNumber = 0,
    pageSize = 5,
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

  // TODO: Unificar com o read
  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 0,
    pageSize: number = 5,
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
