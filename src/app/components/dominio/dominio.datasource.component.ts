import { Dominio } from '../model/dominio.model';
import { DominioService } from '../service/dominio.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../model/query.model';

export class DominioDataSource implements DataSource<Dominio> {
  private dominioSubject = new BehaviorSubject<Dominio[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private dominioService: DominioService) { }

  loadDominios(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.dominioService
      .find(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((dominios: Dominio[]) =>
        this.dominioSubject.next(dominios)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<Dominio[]> {
    console.log('Conectando ao data source');
    return this.dominioSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dominioSubject.complete();
    this.loadingSubject.complete();
  }
}
