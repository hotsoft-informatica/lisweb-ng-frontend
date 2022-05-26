import { ResponsavelTecnicoService } from './../../service/responsavel-tecnico.service';
import { ResponsavelTecnico } from '../../model/responsavel-tecnico.model';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Query } from '../../model/query.model';

export class ResponsavelTecnicoReadDataSource implements DataSource<ResponsavelTecnico> {
  private responsavelTecnicoSubject = new BehaviorSubject<ResponsavelTecnico[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  query: Query[] = [];

  public loading$ = this.loadingSubject.asObservable();

  constructor(private responsavelTecnicoService: ResponsavelTecnicoService) { }

  loadResponsavelTecnico(
    active: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    query: Query[] | null
  ) {
    this.loadingSubject.next(true);

    this.responsavelTecnicoService
      .findResponsavelTecnico(active, sortDirection, pageIndex, pageSize, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((responsavelTecnico: ResponsavelTecnico[]) =>
        this.responsavelTecnicoSubject.next(responsavelTecnico)
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<ResponsavelTecnico[]> {
    console.log('Conectando ao data source');
    return this.responsavelTecnicoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.responsavelTecnicoSubject.complete();
    this.loadingSubject.complete();
  }
}
