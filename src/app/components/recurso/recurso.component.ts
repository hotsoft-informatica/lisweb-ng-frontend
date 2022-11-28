import { Query } from '../model/query.model';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, Renderer2, ElementRef, Input } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Recurso } from '../model/recurso.model';
import { RecursoService } from '../service/recurso.service';
import { Dominio } from '../model/dominio.model';
import { DominioService } from '../service/dominio.service';
import { TipoRecurso } from '../model/tipo-recurso.model';
import { TipoRecursoService } from '../service/tipo-recurso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { tap, debounceTime } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
export class RecursoComponent implements OnInit, AfterViewInit {
  @Input('dominios') dominios: Dominio[] = [];
  @Input('tipos_recurso') tipos_recurso: TipoRecurso[] = [];

  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;
  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;

  @ViewChild('dominio_id') dominio_id!: ElementRef;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  queries: Query[] = [];
  subjectDominio: Subject<any> = new Subject();
  subjectTipoRecurso: Subject<any> = new Subject();

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'nome',
    'tipo_recurso_id',
    'dominio_id',
    'laboratorio_id',
    'action'
  ];

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private recordService: RecursoService,
    private dominioService: DominioService,
    private tipoRecursoService: TipoRecursoService
  ) {
    this.currentRecord = new Recurso({});
    this.record ||= new Recurso({});
  }

  ngOnInit(): void {
    this.recordService.countRegisters().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });

    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectDominio.pipe(debounceTime(500)).subscribe(() => {
      this.dominioService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((dominios) => {
          console.table(this.queries);
          this.dominios = dominios;
        });
    });
    this.subjectDominio.next(null);

    this.subjectTipoRecurso.pipe(debounceTime(500)).subscribe(() => {
      this.tipoRecursoService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((tipos_recurso) => {
          console.table(this.queries);
          this.tipos_recurso = tipos_recurso;
        });
    });
    this.subjectTipoRecurso.next(null);
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
      if (this.dominio_id !== undefined) {
        console.log("Entrou no onfocus");
        this.renderer.selectRootElement(this.dominio_id["nativeElement"]).focus();
      }
    });
  }

  addGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.recordService.showMessage('Recurso criado com sucesso!');
    });

    this.currentRecord = new Recurso({});
    this.onFocus();
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.update(this.currentRecord).subscribe((recurso) => {
      this.recordService.showMessage('Recurso atualizado com sucesso!');
      this.onFocus();
    });

    this.currentRecord = new Recurso({});
  }

  atualizar(row: Recurso): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
    this.onFocus();
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new Recurso({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("entrou no if do result");
        this.recordService.delete(id)
          .subscribe((record) => {
            this.recordService.showMessage('Recurso apagado com sucesso!');

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

  searchDominio(): void {
    const query_string = this.currentRecord
      .dominio_id as unknown as string;
    const query = new Query({
      key: 'descricao',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectDominio.next(null);
  }

  displayFnDominio(options: Dominio[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.descricao : '';
    };
  }

  searchTipoRecurso(): void {
    const query_string = this.currentRecord
      .tipo_recurso_id as unknown as string;
    const query = new Query({
      key: 'descricao',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectTipoRecurso.next(null);
  }

  displayFnTipoRecurso(options: TipoRecurso[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.descricao : '';
    };
  }
}
