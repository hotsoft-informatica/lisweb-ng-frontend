import { LaboratorioReadDataSource } from './laboratorio-read-datasource';
import { LaboratorioService } from '../../service/laboratorio.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { merge } from 'rxjs';
import { Query } from '../../model/query.model';
import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
    selector: 'app-laboratorio-read',
    templateUrl: './laboratorio-read.component.html',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatTableModule, MatSortModule, RouterLink, MatPaginatorModule, NgIf, MatProgressSpinnerModule, AsyncPipe, DatePipe]
})
export class LaboratorioReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: LaboratorioReadDataSource;
  displayedColumns = [
    'serie',
    'nome',
    'laboratory_domain_id',
    'criado_em',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  query: Query[] = [];
  serieSearch: string = '';
  nomeSearch: string = '';

  constructor(private laboratorioService: LaboratorioService) { }

  search(key: string, value: string, isNumeric: boolean= false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadLaboratoriosPage();
  }

  ngOnInit(): void {
    this.dataSource = new LaboratorioReadDataSource(this.laboratorioService);
    this.dataSource.loadLaboratorios('serie', 'asc', 0, 240, null);
    this.laboratorioService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    // reseta o paginador depois de ordenar
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // Na ordenação ou paginação, carrega uma nova página
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadLaboratoriosPage()))
      .subscribe();
  }

  loadLaboratoriosPage() {
    this.dataSource.loadLaboratorios(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }
}
