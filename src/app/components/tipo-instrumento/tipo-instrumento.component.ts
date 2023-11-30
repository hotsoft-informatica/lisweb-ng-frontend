import { Component, OnInit, AfterViewInit,
  ViewChild, TemplateRef, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoInstrumento } from '../model/tipo-instrumento.model';
import { TipoInstrumentoService } from '../service/tipo-instrumento.service';
import { Driver } from '../model/driver.model';
import { DriverService } from '../service/driver.service';
import { Relatorio } from '../model/relatorio.model';
import { RelatorioMapaLoteService } from '../service/relatorio-mapa-lote.service';
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
import { ValorModalidadePipe } from 'src/app/pipes/modalidade.pipe';
import { ValorInterfaceamentoPipe } from 'src/app/pipes/interfaceamento.pipe';
import { ValorPadraoCodigoBarraPipe } from 'src/app/pipes/padrao-codigo-barra.pipe';
import { ValorSimNaoStatusPipe } from 'src/app/pipes/sim-nao-status.pipe';

@Component({
  selector: 'app-tipo-instrumento',
  standalone: true,
  templateUrl: './tipo-instrumento.component.html',
  imports: [
    CommonModule, MatIconModule, NgIf, MatFormFieldModule, MatInputModule, FormsModule,
    MatAutocompleteModule, NgIf, NgFor, MatOptionModule, MatSelectModule, MatTabsModule,
    MatButtonModule, MatTableModule, MatSortModule, MatDialogModule, MatPaginatorModule,
    MatDatepickerModule, ValorModalidadePipe, ValorInterfaceamentoPipe,
    ValorPadraoCodigoBarraPipe, ValorSimNaoStatusPipe, ReactiveFormsModule
  ]

})
export class TipoInstrumentoComponent implements OnInit, AfterViewInit {
  @Input('drivers') drivers: Driver[] = [];
  @Input('relatoriosMapaLote') relatoriosMapaLote: Relatorio[] = [];

  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;
  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  queries: Query[] = [];
  id!: number;
  totalCount!: number;

  @ViewChild('driver_id') driver_id!: ElementRef;
  @ViewChild('relatorio_id') relatorio_id!: ElementRef;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  descricaoFormControl  = new FormControl('', [
    Validators.required
  ]);

  subjectDriver: Subject<any> = new Subject();
  subjectRelatorioMapaLote: Subject<any> = new Subject();

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'modalidade',
    'descricao',
    'cod_instrumento',
    'padrao_cod_barras',
    'relatorio_id',
    'interfaceamento',
    'diretorio_transf_dados',
    'aprova_exame_bancada',
    'habilita_triagem_rapida',
    'sobrescreve_resultado',
    'driver_id',
    'action'
  ];

  constructor(
    public dialog: MatDialog,
    private recordService: TipoInstrumentoService,
    private driverService: DriverService,
    private relatorioMapaLoteService: RelatorioMapaLoteService
  ) {
    this.currentRecord = new TipoInstrumento({});
    this.record ||= new TipoInstrumento({});
  }

  ngOnInit(): void {
    this.recordService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });

    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectDriver.subscribe(() => {
      this.driverService
        .find('id', 'asc', 0, 90, this.queries)
        .subscribe((drivers) => {
          console.table(this.queries);
          this.drivers = drivers;
        });
    });
    this.subjectDriver.next(null);

    this.subjectRelatorioMapaLote.subscribe(() => {
      this.relatorioMapaLoteService
        .find('id', 'asc', 0, 90, this.queries)
        .subscribe((relatoriosMapaLote) => {
          console.table(this.queries);
          this.relatoriosMapaLote = relatoriosMapaLote;
        });
    });
    this.subjectRelatorioMapaLote.next(null);
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
      drivers: this.driverService.find('id', 'asc', 0, 60, this.queries),
      mapaLotes: this.relatorioMapaLoteService.find('id', 'asc', 0, 60, this.queries),
      tipoInstrumentos: this.recordService
      .find(this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize, this.query)
    }).subscribe( resultado => {
      this.drivers = resultado.drivers;
      this.relatoriosMapaLote = resultado.mapaLotes;
      this.records = resultado.tipoInstrumentos;
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
      this.recordService.showMessage('Tipo instrumento cadastrado com sucesso!');
      this.loadPage();
    });
    this.currentRecord = new TipoInstrumento({});
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.update(this.currentRecord).subscribe((recurso) => {
      this.recordService.showMessage('Convênio atualizado com sucesso!');
      this.loadPage();
    });
    this.currentRecord = new TipoInstrumento({});
  }

  atualizar(row: TipoInstrumento): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new TipoInstrumento({});
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

  searchDriver(): void {
    const query_string = this.currentRecord.driver_id as unknown as string;
    const query = new Query({
      key: 'nome',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectDriver.next(null);
  }

  displayFnDriver(options: Driver[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.nome : '';
    };
  }

  searchRelatorioMapaLote(): void {
    const query_string = this.currentRecord.relatorio_id as unknown as string;
    const query = new Query({
      key: 'titulo',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectDriver.next(null);
  }

  displayFnRelatorioMapaLote(options: Relatorio[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.titulo : '';
    };
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
