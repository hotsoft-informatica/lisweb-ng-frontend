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
import { Component, OnInit, Input, Injectable, OnChanges, AfterViewInit } from '@angular/core';
import { Query } from '../../model/query.model';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  filter,
} from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { VersaoExame } from '../../model/versao-exame.model';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@Component({
  selector: 'app-consulta-amostra-show',
  templateUrl: './consulta-amostra-show.component.html',
  styleUrls: ['./consulta-amostra-show.component.css'],
})
export class ConsultaAmostraShowComponent implements OnInit {
  private consultaAmostraSubject = new BehaviorSubject<ConsultaAmostraShowComponent[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);


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
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private consultaAmostraService: ConsultaAmostraService,
    private exameService: ExameService,
    private versaoExameService: VersaoExameService,
    private exameAmostraService: ExameAmostraService,
    private amostraService: AmostraService,
    private translate: TranslateService
  ) { }
  ngOnInit(): void {
    this.dataSource = new ConsultaAmostraShowDataSource(
      this.consultaAmostraService
    );
    this.dataSource.loadConsultaAmostra(null);
    this.pacienteAmostra = new Paciente();
  }


  search(key: string, value: string, isNumeric = false): void {
    this.loadingSubject.next(true);
    this.pacienteAmostra = new Paciente();
    const query = new Query({ key, value, isNumeric });
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
        (materialBiologico: MaterialBiologico) =>
          (this.materialBiologico = materialBiologico)
      );

    this.consultaAmostraService
      .findColetor(this.query)
      .subscribe((coletor: Usuario) => (this.coletor = coletor));
  }

  loadConsultaAmostraPage(): void {
    this.clear = true;
    this.consultaAmostraService
      .findAmostra(this.query)
      .subscribe((amostra: Amostra) => {
        this.amostra = amostra;
        // TODO: Revisar verificar se já existe consulta prévia da amostra.
        this.exameAmostraService
          .read(this.amostra.id, 0)
          .subscribe((exameAmostras: ExameAmostra[]) => {
            this.exameAmostras = exameAmostras;
            this.exameAmostras.forEach((exameAmostra) => {
              this.amostraService
                .readById(exameAmostra.amostra_id as number)
                .subscribe((amostra: Amostra) => {
                  exameAmostra.amostra = amostra;
                });
              this.consultaExame(exameAmostra);
            });
          }).add(() => {
          });
      });
  }

  consultaExame(exameAmostra: ExameAmostra): void {
    this.exameService
      .readById(exameAmostra.exame_id as number)
      .subscribe((exame: Exame) => {
        const versaoExameSubscribe = this.versaoExameService
          .readById(exame?.versao_exame_id as number)
          .subscribe((versaoExame: VersaoExame) => {
            exame.versao_exame = versaoExame;
          })

        versaoExameSubscribe.add(() => {
          this.loadingSubject.next(false);
        });
        exameAmostra.exame = exame;
      }).add(() => {
      });
  }

  consultaStatus(status: string | undefined): string {
    switch (status) {
      case 'A':
        return '#01FC1A';
        break;
      case 'I':
        return '#C0DCC0';
        break;
      case 'E':
        return '#A6CAF0';
        break;
      case 'N':
        return '#FFD700';
        break;
      default:
        return '';
        break;
    }
  }

  consultaStatusAlt(status: string | undefined): string {
    switch (status) {
      case 'A':
        return 'Resultado Aprovado';
        break;
      case 'I':
        return 'Resultado Informado';
        break;
      case 'E':
        return 'Laudo Entregue';
        break;
      case 'L':
        return 'Resultado Liberado';
        break;
      case 'N':
        return 'Em Análise';
        break;
      case 'P':
        return 'Resultado Reprovado';
        break;
      case 'R':
        return 'Requisitado';
        break;
      default:
        return '';
        break;
    }
  }
}
