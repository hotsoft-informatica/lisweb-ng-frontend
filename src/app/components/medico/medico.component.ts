import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef,
  Renderer2,
  ElementRef,
  Input
} from '@angular/core';
import { Medico } from '../model/medico.model';
import { MedicoService } from '../service/medico.service';
import { Especialidade } from '../model/especialidade.model';
import { EspecialidadeService } from '../service/especialidade.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { merge } from 'rxjs';
import { Query } from '../model/query.model';
import { Subject, timer } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, NgIf, MatFormFieldModule, MatInputModule, FormsModule,
    MatAutocompleteModule, NgFor, MatOptionModule, MatSelectModule, MatTabsModule,
    MatButtonModule, MatTableModule, MatSortModule, MatDialogModule, MatPaginatorModule
  ]
})
export class MedicoComponent implements OnInit, AfterViewInit {
  @Input('especialidades') especialidades: Especialidade[] = [];

  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;
  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;

  @ViewChild('especialidade_id') especialidade_id!: ElementRef;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  queries: Query[] = [];
  subjectEspecialidade: Subject<any> = new Subject();

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'nome',
    'especialidade_id',
    'cod_medico',
    'nome',
    'crm',
    'endereco',
    'bairro',
    'cep',
    'cidade:',
    'uf',
    'telefone',
    'fax',
    'email',
    'senha',
    'iniciais',
    'nome_sombra',
    'cpf',
    'cnes',
    'conselho',
    'uf_conselho',
    'cns',
    'numero',
    'data_nascimento',
    'celular',
    'enviar_stokfin',
    'status',
    'operadora_telefonia_id',
    'recebe_mensagem_automatica',
    'recebe_mensagem_adicional',
    'recebe_sms',
    'recebe_email',
    'version_id',
    'laboratory_domain_id',
    'deleted',
    'changed_by_lab_id',
    'orientacao',
    'uuid',
    'action'
  ];

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private recordService: MedicoService,
    private especialidadeService: EspecialidadeService
  ) {
    this.currentRecord = new Medico({});
    this.record ||= new Medico({});
  }

  ngOnInit(): void {
    this.recordService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });

    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectEspecialidade.pipe(debounceTime(500)).subscribe(() => {
      this.especialidadeService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((especialidades) => {
          console.table(this.queries);
          this.especialidades = especialidades;
        });
    });
    this.subjectEspecialidade.next(null);
  }

  ngAfterViewInit() {
    this.loadPage();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadPage()))
      .subscribe();
  }

  loadPage() {
    this.recordService
      .find(this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize, this.query
      ).subscribe((records: any[]) => {
        this.records = records;
        this.datasource.data = [...this.records];
      });
  }

  new(): void {
    this.onCreate = true;
    this.onFocus();
  }

  onFocus(): void {
    timer(250).subscribe(() => {
      if (this.especialidade_id !== undefined) {
        console.log("Entrou no onfocus");
        this.renderer.selectRootElement(this.especialidade_id["nativeElement"]).focus();
      }
    });
  }

  addGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.recordService.showMessage('Médico cadastrado com sucesso!');
    });

    this.currentRecord = new Medico({});
    this.onFocus();
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.update(this.currentRecord).subscribe((recurso) => {
      this.recordService.showMessage('Cadastro médico atualizado com sucesso!');
      this.onFocus();
    });

    this.currentRecord = new Medico({});
  }

  atualizar(row: Medico): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
    this.onFocus();
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new Medico({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recordService.delete(id)
          .subscribe((record) => {
            this.recordService.showMessage('Cadastro médico apagado com sucesso!');

            // Carrega os dados do backend e faz refresh do datasource
            this.loadPage();
            this.datasource.data = [...this.records];
          });
      }
    });
  }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadPage();
  }

  searchEspecialidade(): void {
    const query_string = this.currentRecord
      .especialidade_id as unknown as string;
    const query = new Query({
      key: 'nome',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectEspecialidade.next(null);
  }

  displayFnEspecialidade(options: Especialidade[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.nome : '';
    };
  }
}
