import { catchError, finalize } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Query } from 'src/app/components/model/query.model';
import { ValorReferencia } from 'src/app/components/model/valor-referencia.model';
import { ValorReferenciaService } from 'src/app/components/service/valor-referencia.service';

export class ValorReferenciaReadDataSource implements DataSource<ValorReferencia> {
  private valoresReferenciaSubject = new BehaviorSubject<ValorReferencia[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private valorReferenciaService: ValorReferenciaService) { }

  loadValoresReferencia(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.valorReferenciaService
      .find(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((valoresReferencia: ValorReferencia[]) =>
        this.valoresReferenciaSubject.next(valoresReferencia)
      );
  }

  connect(): Observable<ValorReferencia[]> {
    return this.valoresReferenciaSubject.asObservable();
  }

  disconnect(): void {
    this.valoresReferenciaSubject.complete();
    this.loadingSubject.complete();
  }
}
