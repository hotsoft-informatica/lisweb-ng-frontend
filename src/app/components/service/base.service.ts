import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';
import { Query } from './../model/query.model';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  endpoint = '/';

  constructor(@Inject(Injector) private readonly injector: Injector) { }

  private get defaultService() {
    return this.injector.get(DefaultService);
  }

  showMessage(msg: string): void {
    this.defaultService.showMessage(msg);
  }

  create(record: any): Observable<any> {
    return this.defaultService.create(record, this.endpoint);
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    pageNumber = 1,
    pageSize = 3,
    queries: Query[]
  ): Observable<any[]> {
    return this.defaultService.read(sortActive, sortDirection, pageNumber, pageSize, queries, this.endpoint);
  }

  readById(id: number): Observable<any> {
    return this.defaultService.readById(id, this.endpoint);
  }

  update(record: any): Observable<any> {
    return this.defaultService.update(record, this.endpoint);
  }

  delete(id: number): Observable<any> {
    return this.defaultService.delete(id, this.endpoint);
  }

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<any[]> {
    return this.defaultService.find(active, sortOrder, pageNumber, pageSize, query, this.endpoint);
  }

  count(): Observable<number> {
    return this.defaultService.count(this.endpoint);
  }
}
