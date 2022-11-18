import { LaboratoryDomain } from '../../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class LaboratoryDomainReadDataSource implements DataSource<LaboratoryDomain> {
  private laboratoryDomainsSubject = new BehaviorSubject<LaboratoryDomain[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private laboratoryDomainService: LaboratoryDomainService) { }

  loadLaboratoryDomains(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.laboratoryDomainService
      .findLaboratoryDomains(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((laboratoryDomains: LaboratoryDomain[]) =>
        this.laboratoryDomainsSubject.next(laboratoryDomains)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<LaboratoryDomain[]> {
    return this.laboratoryDomainsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.laboratoryDomainsSubject.complete();
    this.loadingSubject.complete();
  }
}
