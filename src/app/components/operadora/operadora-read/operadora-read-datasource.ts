import { Empresa } from '../../model/empresa.model';
import { OperadoraService } from '../../service/operadora.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class OperadoraReadDataSource implements DataSource<Empresa> {
  private operadorasSubject = new BehaviorSubject<Empresa[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private operadoraService: OperadoraService) { }

  loadOperadoras(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.operadoraService
      .findOperadoras(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((operadoras: Empresa[]) =>
        this.operadorasSubject.next(operadoras)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<Empresa[]> {
    console.log('Conectando ao data source');
    return this.operadorasSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.operadorasSubject.complete();
    this.loadingSubject.complete();
  }
}
