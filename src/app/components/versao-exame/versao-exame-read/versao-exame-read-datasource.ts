import { VersaoExame } from '../../model/versao-exame.model';
import { VersaoExameService } from '../../service/versao-exame.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class VersaoExameReadDataSource implements DataSource<VersaoExame> {
  private versaoExamesSubject = new BehaviorSubject<VersaoExame[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private versaoExameService: VersaoExameService) { }

  loadVersaoExames(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.versaoExameService
      .findVersaoExames(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((versaoExames: VersaoExame[]) =>
        this.versaoExamesSubject.next(versaoExames)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<VersaoExame[]> {
    return this.versaoExamesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.versaoExamesSubject.complete();
    this.loadingSubject.complete();
  }
}
