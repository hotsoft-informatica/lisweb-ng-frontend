import { ConsultaAmostraShowDataSource } from './consulta-amostra-show-datasource';
import { ConsultaAmostraService } from './../../service/consulta-amostra.service';
import { ConsultaAmostra } from '../../model/consulta-amostra.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Query } from '../../model/query.model';
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
  clear!: boolean;
  dataSource!: ConsultaAmostraShowDataSource;
  displayedColumns = ['id', 'num_amostra', 'laboratorio_id', 'created_at'];

  query: Query[] = [];

  constructor(private consultaAmostraService: ConsultaAmostraService) { }
  ngOnInit(): void {
    this.dataSource = new ConsultaAmostraShowDataSource(
      this.consultaAmostraService
    );
    this.dataSource.loadConsultaAmostra;
  }

  search(key: string, value: string): void {
    let query = new Query({ key, value });
    this.query.push(query);
    this.loadConsultaAmostraPage();
  }

  loadConsultaAmostraPage() {
    this.clear = true;
    this.dataSource.loadConsultaAmostra(this.query);
  }
}
