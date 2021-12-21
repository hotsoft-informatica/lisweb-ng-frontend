import { AmostraService } from './../../service/amostra.service';
import { ExameAmostraService } from './../../service/exame-amostra.service';
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
import { VersaoExameService } from '../../service/versao-exame.service';
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
import { VersaoExame } from '../../model/versao-exame.model';

@Component({
  selector: 'app-consulta-amostra-show',
  templateUrl: './consulta-amostra-show.component.html',
  styleUrls: ['./consulta-amostra-show.component.css'],
})
export class ConsultaAmostraShowComponent implements OnInit {
  exameAmostras!: ExameAmostra[];
  exameId!: number | undefined;
  exame!: Exame;
  versaoExame!: VersaoExame;
  amostra!: Amostra;
  pacienteAmostra!: Paciente;
  pacienteExame!: Exame;
  materialBiologico!: MaterialBiologico;
  coletor!: Usuario;
  clear!: boolean;
  dataSource!: ConsultaAmostraShowDataSource;
  displayedColumns = [
    'id',
    'original_id',
    'laboratorio_id',
    'version_id',
    'created_at',
  ];

  query: Query[] = [];

  constructor(
    private consultaAmostraService: ConsultaAmostraService,
    private exameService: ExameService,
    private versaoExameService: VersaoExameService,
    private exameAmostraService: ExameAmostraService,
    private amostraService: AmostraService
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
      .subscribe((amostra: Amostra) => {
        this.amostra = amostra;
        this.exameAmostraService
          .read(this.amostra.id, 0)
          .subscribe((exameAmostras: ExameAmostra[]) => {
            this.exameAmostras = exameAmostras;
            this.exameAmostras.forEach((exameAmostra) => {
              this.amostraService
                .readById(exameAmostra.amostra_id as number)
                .subscribe((amostra: Amostra) => {
                  exameAmostra.amostra = amostra;
                  console.log(exameAmostra.exame?.id);
                });
              this.exameService
                .readById(exameAmostra.exame_id as number)
                .subscribe((exame: Exame) => {
                  console.log(exameAmostra.amostra?.id);
                  this.versaoExameService
                    .readById(exame?.versao_exame_id as number)
                    .subscribe((versaoExame: VersaoExame) => {
                      exame.versao_exame = versaoExame;
                      console.log(exameAmostra.amostra?.id);
                    });
                  exameAmostra.exame = exame;
                });
            });
          });
      });

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
    // this.exameId = this.dataSource.first.exame_id;
    this.consultaExame();
  }

  consultaExame(): void {
    this.exameService
      .readById(this.exameId as number)
      .subscribe((exame) => (this.exame = exame));
  }
}
