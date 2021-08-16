import { LaboratoryDomain } from '../../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class LaboratoryDomainReadDataSource implements DataSource<LaboratoryDomain> {
  private laboratoryDomainsSubject = new BehaviorSubject<LaboratoryDomain[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private laboratoryDomainService: LaboratoryDomainService) { }

  loadLaboratoryDomains(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    filter: string
  ) {
    this.loadingSubject.next(true);

    this.laboratoryDomainService
      .findLaboratoryDomains(active, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((laboratoryDomains: LaboratoryDomain[]) =>
        this.laboratoryDomainsSubject.next(laboratoryDomains)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<LaboratoryDomain[]> {
    console.log('Conectando ao data source');
    return this.laboratoryDomainsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.laboratoryDomainsSubject.complete();
    this.loadingSubject.complete();
  }
}
