import { Marcacao } from '../../model/marcacao.model';
import { MarcacaoService } from '../../service/marcacao.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class MarcacaoReadDataSource implements DataSource<Marcacao> {
  private marcacoesSubject = new BehaviorSubject<Marcacao[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private marcacaoService: MarcacaoService) { }

  loadMarcacoes(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.marcacaoService
      .findMarcacoes(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((marcacoes: Marcacao[]) =>
        this.marcacoesSubject.next(marcacoes)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<Marcacao[]> {
    return this.marcacoesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.marcacoesSubject.complete();
    this.loadingSubject.complete();
  }
}
