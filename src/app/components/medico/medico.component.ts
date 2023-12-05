import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef,
  ElementRef,
  Input
} from '@angular/core';
import { Medico } from '../model/medico.model';
import { MedicoService } from '../service/medico.service';
import { Especialidade } from '../model/especialidade.model';
import { EspecialidadeService } from '../service/especialidade.service';
import { OperadoraTelefonia } from '../model/operadora-telefonia.model';
import { OperadoraTelefoniaService } from '../service/operadora-telefonia.service';
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
import { FormsModule, ReactiveFormsModule, FormControl, NgModel, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, NgIf, MatFormFieldModule, MatInputModule, FormsModule,
    MatAutocompleteModule, NgFor, MatOptionModule, MatSelectModule, MatTabsModule,
    MatButtonModule, MatTableModule, MatSortModule, MatDialogModule, MatPaginatorModule,
    MatDatepickerModule, ReactiveFormsModule
  ]
})
export class MedicoComponent implements OnInit, AfterViewInit {
  @Input('especialidades') especialidades: Especialidade[] = [];
  @Input('operadoras_telefonia') operadoras_telefonia: OperadoraTelefonia[] = [];

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
  @ViewChild('operadora_telefonia_id') operadora_telefonia_id!: ElementRef;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  nomeFormControl = new FormControl('', [
    Validators.required
  ]);

  crmFormControl = new FormControl('', [
    Validators.required
  ]);

  queries: Query[] = [];
  subjectEspecialidade: Subject<any> = new Subject();
  subjectOperadoraTelefonia: Subject<any> = new Subject();

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'nome',
    'especialidade_id',
    'crm',
    'nome_sombra',
    'action'
  ];

  constructor(
    public dialog: MatDialog,
    private recordService: MedicoService,
    private especialidadeService: EspecialidadeService,
    private operadoraTelefoniaService: OperadoraTelefoniaService
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
        .find('id', 'asc', 0, 99999, [])
        .subscribe((especialidades) => {
          console.table(this.queries);
          this.especialidades = especialidades;
        });
    });
    this.subjectEspecialidade.next(null);

    this.subjectOperadoraTelefonia.pipe(debounceTime(500)).subscribe(() => {
      this.operadoraTelefoniaService
        .find('id', 'asc', 0, 60, [])
        .subscribe((operadoras_telefonia) => {
          console.table(this.queries);
          this.operadoras_telefonia = operadoras_telefonia;
        });
    });
    this.subjectOperadoraTelefonia.next(null);
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
  }

  addGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.create(this.currentRecord).subscribe((record) => {
      // this.records.unshift(record);
      // this.datasource.data = [...this.records];
      this.recordService.showMessage('Médico cadastrado com sucesso!');
      this.loadPage();
    });

    this.currentRecord = new Medico({});
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.update(this.currentRecord).subscribe((recurso) => {
      this.recordService.showMessage('Cadastro médico atualizado com sucesso!');
      this.loadPage();
    });
    this.currentRecord = new Medico({});
  }

  atualizar(row: Medico): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
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

  searchOperadoraTelefonia(): void {
    const query_string = this.currentRecord
      .operadora_telefonia_id as unknown as string;
    const query = new Query({
      key: 'descricao',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectOperadoraTelefonia.next(null);
  }

  displayFnOperadoraTelefonia(options: OperadoraTelefonia[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.descricao : '';
    };
  }

  duplicidadeNome(nome: string): any {
    const query = new Query({ key: 'nome_eq', value: (nome || this.currentRecord.nome), isNumeric: false });

    if (this.currentRecord.nome != ''){
      this.recordService.find(
        'id',
        'asc',
        0,
        1,
        [query]
      ).subscribe( (descricoes) => {
        console.table(descricoes);
        if (descricoes.length > 0) {
          let _errors = this.nomeFormControl.errors
          let _new_errors = {"nomeDuplicado": true}

          Object.assign(_new_errors, _errors)
          this.nomeFormControl.setErrors(_new_errors)
        }
      })
    }
  }

  duplicidadeCrm(crm: string): any {
    const query = new Query({ key: 'crm_eq', value: (crm || this.currentRecord.crm), isNumeric: false });

    if (this.currentRecord.crm != ''){
      this.recordService.find(
        'id',
        'asc',
        0,
        1,
        [query]
      ).subscribe( (descricoes) => {
        console.table(descricoes);
        if (descricoes.length > 0) {
          let _errors = this.crmFormControl.errors
          let _new_errors = {"crmDuplicado": true}

          Object.assign(_new_errors, _errors)
          this.crmFormControl.setErrors(_new_errors)
        }
      })
    }
  }
}
