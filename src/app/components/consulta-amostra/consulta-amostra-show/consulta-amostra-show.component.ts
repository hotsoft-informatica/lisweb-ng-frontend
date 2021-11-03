import { ConsultaAmostraService } from './../../service/consulta-amostra.service';
import { ConsultaAmostra } from '../../model/consulta-amostra.model';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Query } from '../../model/query.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  filter,
} from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-consulta-amostra-show',
  templateUrl: './consulta-amostra-show.component.html',
  styleUrls: ['./consulta-amostra-show.component.css'],
})
export class ConsultaAmostraShowComponent implements OnInit {
  totalCount!: number;
  dataSource!: ConsultaAmostra;
  displayedColumns = [
    'id',
    'original_id',
    'laboratorio_id',
    'exame_id',
    'amostra_id',
    'num_multi_amostra',
    'created_at',
    'updated_at',
    'agrupamento_amostra_id',
    'fracionamento_amostra_id',
    'version_id',
    'laboratory_domain_id',
    'action'
  ];

  query: Query[] = [];

  constructor(private consultaAmostraService: ConsultaAmostraService) { }
  ngOnInit(): void {
    // this.dataSource = new ConsultaAmostraService(
    //   this.consultaAmostraService
    // );
  }

  search(key: string, value: string): void {
    const query = new Query({ key, value });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.loadConsultaAmostrasPage();
  }

  loadConsultaAmostrasPage() {
    this.dataSource.loadConsultaAmostras(
      this.query
    );
  }



------
  search(key: string, value: string): void {
    let query = new Query({ key, value });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadLaboratoriosPage();
  }

ngOnInit(): void {
  this.dataSource = new LaboratorioReadDataSource(this.laboratorioService);
  this.dataSource.loadLaboratorios('id', 'desc', 1, 10, null);
  this.laboratorioService.countLaboratorios().subscribe((totalCount) => {
    this.totalCount = totalCount;
  });
}

ngAfterViewInit() {
  this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

  merge(this.sort.sortChange, this.paginator.page) //Na ordenação ou paginação, carrega uma nova página
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
