import { LaboratoryGetFilter } from './../../model/laboratory-get-filter.model';
import { LaboratoryGetFilterService } from '../../service/laboratory-get-filter.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class LaboratoryGetFilterReadDataSource implements DataSource<LaboratoryGetFilter> {
  private laboratoryGetFiltersSubject = new BehaviorSubject<LaboratoryGetFilter[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private laboratoryGetFilterService: LaboratoryGetFilterService) { }

  loadLaboratoryGetFilters(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.laboratoryGetFilterService
      .find(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((laboratoryGetFilter: LaboratoryGetFilter[]) =>
        this.laboratoryGetFiltersSubject.next(laboratoryGetFilter)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<LaboratoryGetFilter[]> {
    console.log('Conectando ao data source');
    return this.laboratoryGetFiltersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.laboratoryGetFiltersSubject.complete();
    this.loadingSubject.complete();
  }
}
