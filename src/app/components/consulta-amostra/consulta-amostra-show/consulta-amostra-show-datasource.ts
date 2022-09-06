import { ExameAmostra } from './../../model/exame-amostra.model';
import { ConsultaAmostra } from '../../model/consulta-amostra.model';
import { ConsultaAmostraService } from '../../service/consulta-amostra.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';
import { Exame } from '../../model/exame.model';

export class ConsultaAmostraShowDataSource implements DataSource<ConsultaAmostra> {
  private consultaAmostraSubject = new BehaviorSubject<ConsultaAmostra[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();
  public first!: ExameAmostra;

  constructor(private consultaAmostraService: ConsultaAmostraService) { }

  loadConsultaAmostra(
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.consultaAmostraService
      .findConsultaAmostra(query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((consultaAmostra: ConsultaAmostra[]) => {
        this.first = consultaAmostra[0];
        this.consultaAmostraSubject.next(consultaAmostra)
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<ConsultaAmostra[]> {
    return this.consultaAmostraSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.consultaAmostraSubject.complete();
    this.loadingSubject.complete();
  }
}
