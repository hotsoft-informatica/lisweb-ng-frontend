import { Component, OnInit, AfterViewInit,
  ViewChild, TemplateRef, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Convenio } from '../model/convenio.model';
import { ConvenioService } from '../service/convenio.service';
import { Operadora } from '../model/operadora.model';
import { OperadoraService } from '../service/operadora.service';
import { Empresa } from '../model/empresa.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { merge } from 'rxjs';
import { Query } from '../model/query.model';
import { Subject, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, FormControl, NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConvenioDetalheComponent } from './convenio-detalhe/convenio-detalhe.component';
import { RelatorioGuiaService } from '../service/relatorio-guia.service';
import { RelatorioFaturaService } from '../service/relatorio-fatura.service';
import { RelatorioExportacaoService } from '../service/relatorio-exportacao.service';
import { Relatorio } from '../model/relatorio.model';

@Component({
  selector: 'app-convenio',
  standalone: true,
  templateUrl: './convenio.component.html',
  imports: [
    CommonModule, MatIconModule, NgIf, MatFormFieldModule, MatInputModule, FormsModule,
    MatAutocompleteModule, NgIf, NgFor, MatOptionModule, MatSelectModule, MatTabsModule,
    MatButtonModule, MatTableModule, MatSortModule, MatDialogModule, MatPaginatorModule,
    MatDatepickerModule, ConvenioDetalheComponent
  ]
})
export class ConvenioComponent implements OnInit, AfterViewInit {
  @Input('operadoras') operadoras: Operadora[] = [];
  @Input('relatoriosGuia') relatoriosGuia: Relatorio[] = [];
  @Input('relatoriosFatura') relatoriosFatura: Relatorio[] = [];
  @Input('relatoriosExportacao') relatoriosExportacao: Relatorio[] = [];

  operadora: Operadora;
  empresa: Empresa;

  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;
  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;
  nomeDuplicado: boolean = false;

  @ViewChild('operadora_id') operadora_id!: ElementRef;
  @ViewChild('empresa_id') empresa_id!: ElementRef;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild('nome') nome!: NgModel;

  queries: Query[] = [];
  subjectOperadora: Subject<any> = new Subject();

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'nome',
    'email',
    'chave_web',
    'operadora_id',
    'action'
  ];

  constructor(
    public dialog: MatDialog,
    private recordService: ConvenioService,
    private operadoraService: OperadoraService,
    private relatorioFaturaService: RelatorioFaturaService,
    private relatorioGuiaService: RelatorioGuiaService,
    private relatorioExportacaoService: RelatorioExportacaoService,
  ) {
    this.currentRecord = new Convenio({});
    this.record ||= new Convenio({});
    this.operadora ||= new Operadora({});
    this.empresa ||= new Empresa({});
  }

  ngOnInit(): void {
    this.recordService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });

    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectOperadora.subscribe(() => {
      this.operadoraService
        .find('id', 'asc', 0, 90, [])
        .subscribe((operadoras) => {
          console.table(this.queries);
          this.operadoras = operadoras;
        });
    });
    this.subjectOperadora.next(null);
  }

  ngAfterViewInit() {
    this.loadPage();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadPage()))
      .subscribe();
  }

  loadPage() {
    forkJoin({
      guias: this.relatorioGuiaService.find('id', 'asc', 0, 60, this.queries),
      faturas: this.relatorioFaturaService.find('id', 'asc', 0, 60, this.queries),
      exportacoes: this.relatorioExportacaoService.find('id', 'asc', 0, 60, this.queries),
      convenios: this.recordService
      .find(this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize, this.query)
    }).subscribe( resultado => {
      this.relatoriosFatura = resultado.faturas;
      this.relatoriosExportacao = resultado.exportacoes;
      this.relatoriosGuia = resultado.guias;
      this.records = resultado.convenios;
      this.datasource.data = [...this.records];
    })
  }

  new(): void {
    this.onCreate = true;
  }

  addGridData(): void {
    console.table(this.currentRecord);
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.recordService.showMessage('Convênio cadastrado com sucesso!');
      this.loadPage();
    });
    this.currentRecord = new Convenio({});
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.update(this.currentRecord).subscribe((recurso) => {
      this.recordService.showMessage('Convênio atualizado com sucesso!');
      this.loadPage();
    });
    this.currentRecord = new Convenio({});
  }

  atualizar(row: Convenio): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new Convenio({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recordService.delete(id).subscribe((record) => {
          this.recordService.showMessage('Convênio apagado com sucesso!');
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

  searchOperadora(): void {
    const query_string = this.currentRecord
      .operadora_id as unknown as string;
    const query = new Query({
      key: 'empresa.nome_fantasia',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectOperadora.next(null);
  }

  displayFnOperadora(options: Operadora[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.empresa?.nome_fantasia : '';
    };
  }

  duplicidadeNome(): any {
    const query = new Query({ key: 'nome_eq', value: this.currentRecord.nome, isNumeric: false });
    console.warn(query);

    if (this.currentRecord.nome == ''){
      this.nomeDuplicado = false;
    } else {
      this.recordService.find(
        'id',
        'asc',
        0,
        1,
        [query]
      ).subscribe( (convenios) => {
        console.table(convenios);
        if (convenios.length > 0) {
          this.nomeDuplicado = true;
        } else {
          this.nomeDuplicado = false;
        }
      })
    }
  }
}
