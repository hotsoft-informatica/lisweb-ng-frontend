import { Operadora } from '../../model/operadora.model';
import { OperadoraService } from '../../service/operadora.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class OperadoraReadDataSource implements DataSource<Operadora> {
  private operadorasSubject = new BehaviorSubject<Operadora[]>([]);
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
      .find(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((operadoras: Operadora[]) =>
        this.operadorasSubject.next(operadoras)
      );
  }

  connect(): Observable<Operadora[]> {
    return this.operadorasSubject.asObservable();
  }

  disconnect(): void {
    this.operadorasSubject.complete();
    this.loadingSubject.complete();
  }
}
