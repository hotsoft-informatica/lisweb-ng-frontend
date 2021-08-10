import { Laboratorio } from './../../model/laboratorio.model';
import { LaboratorioService } from '../../service/laboratorio.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class LaboratorioReadDataSource implements DataSource<Laboratorio> {
  private laboratoriosSubject = new BehaviorSubject<Laboratorio[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private laboratorioService: LaboratorioService) { }

  loadLaboratorios(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.laboratorioService
      .findLaboratorios(filter, sortDirection, pageIndex, pageSize)
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
