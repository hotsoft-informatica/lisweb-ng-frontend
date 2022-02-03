import { Empresa } from '../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class EmpresaReadDataSource implements DataSource<Empresa> {
  private empresasSubject = new BehaviorSubject<Empresa[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private empresaService: EmpresaService) { }

  loadEmpresas(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.empresaService
      .findEmpresas(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((operadoras: Empresa[]) =>
        this.empresasSubject.next(operadoras)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<Empresa[]> {
    console.log('Conectando ao data source');
    return this.empresasSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.empresasSubject.complete();
    this.loadingSubject.complete();
  }
}
