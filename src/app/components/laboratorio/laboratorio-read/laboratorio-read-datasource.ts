import { Laboratorio } from './../../model/laboratorio.model';
import { LaboratorioService } from '../../service/laboratorio.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class LaboratorioReadDataSource implements DataSource<Laboratorio> {
  private laboratoriosSubject = new BehaviorSubject<Laboratorio[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private laboratorioService: LaboratorioService) { }

  loadLaboratorios(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.laboratorioService
      .findLaboratorios(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((laboratorios: Laboratorio[]) =>
        this.laboratoriosSubject.next(laboratorios)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<Laboratorio[]> {
    return this.laboratoriosSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.laboratoriosSubject.complete();
    this.loadingSubject.complete();
  }
}
