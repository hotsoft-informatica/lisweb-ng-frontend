import { ConsultaAmostra } from '../../model/consulta-amostra.model';
import { ConsultaAmostraService } from '../../service/consulta-amostra.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class ConsultaAmostraShowDataSource implements DataSource<ConsultaAmostra> {
  private consultaAmostraSubject = new BehaviorSubject<ConsultaAmostra[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private consultaAmostraService: ConsultaAmostraService) { }

  consultaAmostras(
    active: string,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.consultaAmostraService
      .findConsultaAmostras(active, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((consultaAmostras: ConsultaAmostra[]) =>
        this.consultaAmostraSubject.next(consultaAmostras)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<ConsultaAmostra[]> {
    console.log('Conectando ao data source');
    return this.consultaAmostraSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.consultaAmostraSubject.complete();
    this.loadingSubject.complete();
  }
}
