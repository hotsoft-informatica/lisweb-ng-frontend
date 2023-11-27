import { Component, OnInit, AfterViewInit,
  ViewChild, TemplateRef, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialConsumo } from '../model/material-consumo.model';
import { MaterialConsumoService } from '../service/material-consumo.service';
import { FornecedorSincronizacao } from '../model/fornecedor-sincronizacao.model';
import { FornecedorSincronizacaoService } from '../service/fornecedor-sincronizacao.service';
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
import { FormsModule, ReactiveFormsModule, FormControl, NgModel, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ValorSimNaoStatusPipe } from 'src/app/pipes/sim-nao-status.pipe';
import { ValorModoUsoPipe } from 'src/app/pipes/modo-uso.pipe';

@Component({
  selector: 'app-material-consumo',
  standalone: true,
  templateUrl: './material-consumo.component.html',
  imports: [
    CommonModule, MatIconModule, NgIf, MatFormFieldModule, MatInputModule, FormsModule,
    MatAutocompleteModule, NgIf, NgFor, MatOptionModule, MatSelectModule, MatTabsModule,
    MatButtonModule, MatTableModule, MatSortModule, MatDialogModule, MatPaginatorModule,
    MatDatepickerModule, ValorSimNaoStatusPipe, ValorModoUsoPipe, ReactiveFormsModule
  ]

})
export class MaterialConsumoComponent implements OnInit, AfterViewInit {
  @Input('fornecedores_sincronizacao') fornecedores_sincronizacao: FornecedorSincronizacao[] =[];
  fornecedor_sincronizacao: FornecedorSincronizacao;

  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;
  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;

  @ViewChild('fornecedor_id') fornecedor_id!: ElementRef;

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  codigoFormControl = new FormControl('', [
    Validators.required
  ]);

  descricaoFormControl  = new FormControl('', [
    Validators.required
  ]);

  queries: Query[] = [];
  subjectFornecedorSincronizacao: Subject<any> = new Subject();

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'codigo',
    'descricao',
    'fornecedor_id',
    'modouso',
    'ativo',
    'action'
  ];

  constructor(
    public dialog: MatDialog,
    private recordService: MaterialConsumoService,
    private fornecedorSincronizacaoService: FornecedorSincronizacaoService
  ) {
    this.currentRecord = new MaterialConsumo({});
    this.record ||= new MaterialConsumo({});
    this.fornecedor_sincronizacao ||= new FornecedorSincronizacao({});
  }

  ngOnInit(): void {
    this.recordService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });

    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectFornecedorSincronizacao.subscribe(() => {
      this.fornecedorSincronizacaoService
        .find('id', 'asc', 0, 90, this.queries)
        .subscribe((fornecedores_sincronizacao) => {
          console.table(this.queries);
          this.fornecedores_sincronizacao = fornecedores_sincronizacao;
        });
    });
    this.subjectFornecedorSincronizacao.next(null);
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
      materiais_consumo: this.recordService
      .find(this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize, this.query)
    }).subscribe( resultado => {
      this.records = resultado.materiais_consumo;
      this.datasource.data = [...this.records];
    })
  }

  new(): void {
    this.onCreate = true;
  }

  addGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.recordService.showMessage('Convênio cadastrado com sucesso!');
      this.loadPage();
    });
    this.currentRecord = new MaterialConsumo({});
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.update(this.currentRecord).subscribe((recurso) => {
      this.recordService.showMessage('Convênio atualizado com sucesso!');
      this.loadPage();
    });
    this.currentRecord = new MaterialConsumo({});
  }

  atualizar(row: MaterialConsumo): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new MaterialConsumo({});
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

  searchFornecedor(): void {
    const query_string = this.currentRecord
      .fornecedor_id as unknown as string;
    const query = new Query({
      key: 'nome',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectFornecedorSincronizacao.next(null);
  }

  displayFnFornecedor(options: FornecedorSincronizacao[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.nome : '';
    };
  }

  duplicidadeCodigo(codigo: string): any {
    const query = new Query({ key: 'codigo_eq', value: (codigo || this.currentRecord.codigo), isNumeric: false });

    if (this.currentRecord.codigo != ''){
      this.recordService.find(
        'id',
        'asc',
        0,
        1,
        [query]
      ).subscribe( (codigos) => {
        console.table(codigos);
        if (codigos.length > 0) {
          let _errors = this.codigoFormControl.errors
          let _new_errors = {"codigoDuplicado": true}

          Object.assign(_new_errors, _errors)
          this.codigoFormControl.setErrors(_new_errors)
        }
      })
    }
  }

  duplicidadeDescricao(descricao: string): any {
    const query = new Query({ key: 'descricao_eq', value: (descricao || this.currentRecord.descricao), isNumeric: false });

    if (this.currentRecord.descricao != ''){
      this.recordService.find(
        'id',
        'asc',
        0,
        1,
        [query]
      ).subscribe( (descricoes) => {
        console.table(descricoes);
        if (descricoes.length > 0) {
          let _errors = this.descricaoFormControl.errors
          let _new_errors = {"descricaoDuplicado": true}

          Object.assign(_new_errors, _errors)
          this.descricaoFormControl.setErrors(_new_errors)
        }
      })
    }
  }
}
