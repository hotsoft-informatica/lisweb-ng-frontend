import { Laboratorio } from './../../model/laboratorio.model';
import { LaboratorioService } from '../../service/laboratorio.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class LaboratorioReadDataSource implements DataSource<Laboratorio> {
  private laboratoriosSubject = new BehaviorSubject<Laboratorio[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private laboratorioService: LaboratorioService) { }

  loadLaboratorios(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    filter: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.laboratorioService
      .findLaboratorios(active, sortDirection, pageIndex, pageSize, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((laboratorios: Laboratorio[]) =>
        this.laboratoriosSubject.next(laboratorios)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<Laboratorio[]> {
    console.log('Conectando ao data source');
    return this.laboratoriosSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.laboratoriosSubject.complete();
    this.loadingSubject.complete();
  }
}
