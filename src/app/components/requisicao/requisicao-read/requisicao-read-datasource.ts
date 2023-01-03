import { Requisicao } from '../../model/requisicao.model';
import { RequisicaoService } from '../../service/requisicao.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class RequisicaoReadDataSource implements DataSource<Requisicao> {
  private requisicoesSubject = new BehaviorSubject<Requisicao[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private requisicaoService: RequisicaoService) { }

  loadRequisicoes(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.requisicaoService
      .find(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((requisicoes: Requisicao[]) =>
        this.requisicoesSubject.next(requisicoes)
      );
  }

  connect(): Observable<Requisicao[]> {
    return this.requisicoesSubject.asObservable();
  }

  disconnect(): void {
    this.requisicoesSubject.complete();
    this.loadingSubject.complete();
  }
}
