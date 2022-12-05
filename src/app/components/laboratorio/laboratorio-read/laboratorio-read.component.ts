import { LaboratorioReadDataSource } from './laboratorio-read-datasource';
import { LaboratorioService } from '../../service/laboratorio.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { Query } from '../../model/query.model';
import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-laboratorio-read',
  templateUrl: './laboratorio-read.component.html',
})
export class LaboratorioReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: LaboratorioReadDataSource;
  displayedColumns = [
    'id',
    'nome',
    'laboratory_domain_id',
    'serie',
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
    this.dataSource.loadLaboratorios('id', 'desc', 1, 5, null);
    this.laboratorioService.countLaboratorios().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
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
