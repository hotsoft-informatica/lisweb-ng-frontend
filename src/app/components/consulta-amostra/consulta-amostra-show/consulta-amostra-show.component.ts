import { Amostra } from '../../model/amostra.model';
import { AmostraService } from './../../service/amostra.service';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ConsultaAmostraService } from './../../service/consulta-amostra.service';
import { ConsultaAmostraShowDataSource } from './consulta-amostra-show-datasource';
import { Exame } from './../../model/exame.model';
import { ExameAmostra } from './../../model/exame-amostra.model';
import { ExameAmostraService } from './../../service/exame-amostra.service';
import { ExameService } from '../../service/exame.service';
import { MaterialBiologico } from '../../model/material-biologico.model';
import { Paciente } from '../../model/paciente.model';
import { Query } from '../../model/query.model';
import { Usuario } from '../../model/usuario.model';
import { VersaoExame } from '../../model/versao-exame.model';
import { VersaoExameService } from '../../service/versao-exame.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor, NgStyle, DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-consulta-amostra-show',
    templateUrl: './consulta-amostra-show.component.html',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, NgIf, MatButtonModule, MatIconModule, NgFor, NgStyle, DatePipe]
})
export class ConsultaAmostraShowComponent implements OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  amostra: Amostra = new Amostra({});
  clear!: boolean;
  coletor: Usuario = new Usuario({});
  exame: Exame = new Exame({});
  exameAmostras: ExameAmostra[] = [];
  exameId: number | undefined;
  materialBiologico: MaterialBiologico = new MaterialBiologico({});
  pacienteAmostra: Paciente = new Paciente();
  pacienteExame: Exame = new Exame({});
  versaoExame: VersaoExame = new  VersaoExame({});
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

    this.amostra = new Amostra({});
    this.coletor= new Usuario({});
    this.exame = new Exame({});
    this.exameAmostras= [];
    this.materialBiologico = new MaterialBiologico({});
    this.pacienteAmostra = new Paciente();
    this.pacienteExame = new Exame({});
    this.versaoExame = new VersaoExame({});
    
    this.query = []; // Limpar buscas anteriores, importante
    const searchQuery = new Query({ key, value, isNumeric });
    this.query.push(searchQuery);
    this.loadConsultaAmostraPage();

    this.consultaAmostraService
      .findPaciente(this.query)
      .subscribe(
        (pacienteAmostra: Paciente) => {
          if (pacienteAmostra) {
            this.pacienteAmostra = pacienteAmostra 
          }
        });

    this.consultaAmostraService
      .findExame(this.query)
      .subscribe(
        (pacienteExame: Exame) => {
          if (pacienteExame) {
            this.pacienteExame = pacienteExame
          }
        });

    this.consultaAmostraService
      .findMaterialBiologico(this.query)
      .subscribe(
        (materialBiologico: MaterialBiologico) => {
          if (materialBiologico) {
            this.materialBiologico = materialBiologico
          }
        });

    this.consultaAmostraService
      .findColetor(this.query)
      .subscribe((coletor: Usuario) => {
        if (coletor) {
          this.coletor = coletor
        }
      });
  }

  loadConsultaAmostraPage(): void {
    let AmostraId;
 
    this.query?.forEach((queryItem) => {
      if (queryItem) {
        if (queryItem.key == "id") {
          AmostraId = queryItem.value
        }
      }
    });

    this.clear = true;
    this.consultaAmostraService
      .findAmostraId(AmostraId)
      .subscribe((amostra: Amostra) => {
        if (amostra) {
          this.amostra = amostra;
          // TODO: Revisar verificar se já existe consulta prévia da amostra.
          this.exameAmostraService
            .readByAmostraId(this.amostra.id, 0)
            .subscribe((exameAmostras: ExameAmostra[]) => {
              if (exameAmostras) {
                this.exameAmostras = exameAmostras;
                this.exameAmostras.forEach((exameAmostra) => {
                  this.amostraService
                    .readById(exameAmostra.amostra_id as number)
                    .subscribe((amostra: Amostra) => {
                      exameAmostra.amostra = amostra;
                    });
                  this.consultaExame(exameAmostra);
                });
              }
            }).add(() => {});
        }
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
      }).add(() => {});
  }

  // TODO: Usar outros recursos do angular como pipes
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

  // TODO: Transformar em pipe de tranformacao
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
