import { Paciente } from '../../model/paciente.model';
import { Exame } from './../../model/exame.model';
import { MaterialBiologico } from '../../model/material-biologico.model';
import { ConsultaAmostraShowDataSource } from './consulta-amostra-show-datasource';
import { ConsultaAmostraService } from './../../service/consulta-amostra.service';
import { ConsultaAmostra } from '../../model/consulta-amostra.model';
import { Component, OnInit, Input, Injectable } from '@angular/core';
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
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consulta-amostra-show',
  templateUrl: './consulta-amostra-show.component.html',
  styleUrls: ['./consulta-amostra-show.component.css'],
})
export class ConsultaAmostraShowComponent implements OnInit {
  pacienteAmostra!: Paciente;
  pacienteExame!: Exame;
  materialBiologico!: MaterialBiologico;
  clear!: boolean;
  dataSource!: ConsultaAmostraShowDataSource;
  displayedColumns = ['id', 'num_amostra', 'laboratorio_id', 'created_at'];

  query: Query[] = [];

  constructor(private consultaAmostraService: ConsultaAmostraService) { }
  ngOnInit(): void {
    this.dataSource = new ConsultaAmostraShowDataSource(
      this.consultaAmostraService
    );
    this.dataSource.loadConsultaAmostra(null);
    this.pacienteAmostra = new Paciente({});
  }

  search(key: string, value: string): void {
    this.pacienteAmostra = new Paciente({});
    const query = new Query({ key, value });
    this.query.push(query);
    this.loadConsultaAmostraPage();

    this.consultaAmostraService
      .findPaciente(this.query)
      .subscribe(
        (pacienteAmostra: Paciente) => (this.pacienteAmostra = pacienteAmostra)
      );

    this.consultaAmostraService
      .findExame(this.query)
      .subscribe(
        (pacienteExame: Exame) => (this.pacienteExame = pacienteExame)
      );

    this.consultaAmostraService
      .findMaterialBiologico(this.query)
      .subscribe(
        (materialBiologico: MaterialBiologico) => (this.materialBiologico = materialBiologico)
      );
  }

  loadConsultaAmostraPage(): void {
    this.clear = true;
    this.dataSource.loadConsultaAmostra(this.query);
  }
}
