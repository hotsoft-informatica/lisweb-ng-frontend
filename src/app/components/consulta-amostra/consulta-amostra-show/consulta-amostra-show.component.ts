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
    throw new Error('Method not implemented.');
  }

  search(key: string, value: string): void {
    const query = new Query({ key, value });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
  }
}
