import { ExameAmostra } from './../../model/exame-amostra.model';
import { Amostra } from '../../model/amostra.model';
import { Paciente } from '../../model/paciente.model';
import { Exame } from './../../model/exame.model';
import { MaterialBiologico } from '../../model/material-biologico.model';
import { Coletor } from '../../model/coletor.model';
import { Usuario } from '../../model/usuario.model';
import { ConsultaAmostraShowDataSource } from './consulta-amostra-show-datasource';
import { ConsultaAmostraService } from './../../service/consulta-amostra.service';
import { ExameService } from '../../service/exame.service';
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
  exameId!: number | undefined;
  exame!: Exame;
  amostra!: Amostra;
  pacienteAmostra!: Paciente;
  pacienteExame!: Exame;
  materialBiologico!: MaterialBiologico;
  coletor!: Usuario;
  clear!: boolean;
  dataSource!: ConsultaAmostraShowDataSource;
  displayedColumns = [
    'exame_id',
    'amostra_id',
    'laboratorio_id',
    'version_id',
    'created_at',
  ];

  query: Query[] = [];

  constructor(
    private consultaAmostraService: ConsultaAmostraService,
    private exameService: ExameService
  ) { }
  ngOnInit(): void {
    this.dataSource = new ConsultaAmostraShowDataSource(
      this.consultaAmostraService
    );
    this.dataSource.loadConsultaAmostra(null);
    this.pacienteAmostra = new Paciente({});
  }

  search(key: string, value: string, isNumeric = false): void {
    this.pacienteAmostra = new Paciente({});
    const query = new Query({ key, value, isNumeric });
    this.query.push(query);
    this.loadConsultaAmostraPage();

    this.consultaAmostraService
      .findAmostra(this.query)
      .subscribe((amostra: Amostra) => (this.amostra = amostra));

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
        (materialBiologico: MaterialBiologico) =>
          (this.materialBiologico = materialBiologico)
      );

    this.consultaAmostraService
      .findColetor(this.query)
      .subscribe((coletor: Usuario) => (this.coletor = coletor));
  }

  loadConsultaAmostraPage(): void {
    this.clear = true;
    this.dataSource.loadConsultaAmostra(this.query);
    this.exameId = this.dataSource.first.exame_id;
    this.consultaExame();
  }

  consultaExame(): void {
    this.exameService
      .readById(this.exameId as number)
      .subscribe((exame) => (this.exame = exame));
  }
}
