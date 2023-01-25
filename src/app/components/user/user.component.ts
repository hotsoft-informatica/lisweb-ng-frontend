import { Query } from '../model/query.model';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef,
  Renderer2,
  ElementRef,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { LaboratoryDomain } from '../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../service/laboratory-domain.service';
import { Laboratorio } from '../model/laboratorio.model';
import { LaboratorioService } from '../service/laboratorio.service';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap, debounceTime } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  @Input('laboratory_domains') laboratory_domains: LaboratoryDomain[] = [];
  @Input('laboratorios') laboratorios: Laboratorio[] = [];

  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;
  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  // laboratory_domain_id!: number;
  totalCount!: number;

  @ViewChild('nome') nome!: ElementRef;
  @ViewChild('laboratorio_id') laboratorio_id!: ElementRef;
  @ViewChild('laboratory_domain_id') laboratory_domain_id!: ElementRef;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  queries: Query[] = [];

  subjectLaboratorio: Subject<any> = new Subject();
  subjectLaboratoryDomain: Subject<any> = new Subject();

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'name',
    'email',
    'admin',
    'laboratory_domain_id',
    'laboratorio_id',
    'action'
  ];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private laboratorioService: LaboratorioService,
    private laboratoryDomainService: LaboratoryDomainService
  ) {
    this.currentRecord = new User({});
    this.record ||= new User({});
  }

  ngOnInit(): void {
    this.userService.countRegisters().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });

    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectLaboratoryDomain.pipe(debounceTime(500)).subscribe(() => {
      this.laboratoryDomainService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((laboratory_domains) => {
          // console.table(this.queries);
          this.laboratory_domains = laboratory_domains;
        });
    });

    this.subjectLaboratoryDomain.next(null);
  }

  laboratoryDomainChange(event: any): void {
    this.laboratorioService
      .getAssocLabId(event.source.value)
      .subscribe((laboratorios) => {
        this.laboratorios = laboratorios;
      });
  }

  ngAfterViewInit() {
    this.loadPage();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadPage()))
      .subscribe();
  }

  loadPage() {
    this.userService
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
    this.loadPage();
  }

  addGridData(): void {
    console.table(this.currentRecord);
    this.onCreate = false;
    this.onEdit = false;
    this.userService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.userService.showMessage('Usuário criado com sucesso!');
    });

    this.currentRecord = new User({});
    this.onFocus();
  }

  updateGridData(): void {
    this.onCreate = false;
    this.userService.update(this.currentRecord).subscribe(() => {
      this.userService.showMessage('Usuário atualizado com sucesso!');
      this.onEdit = false;
      this.currentRecord = new User({});
      this.onFocus();
    });
  }

  atualizar(row: User): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
    this.onFocus();
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new User({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.delete(id)
          .subscribe(() => {
            this.userService.showMessage('Usuário apagado com sucesso!');

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

  searchLaboratorio(): void {
    const query_string = this.currentRecord
      .laboratorio_id as unknown as string;
    const query = new Query({
      key: 'nome',
      value: query_string,
      isNumeric: false,
    });
    // console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectLaboratorio.next(null);
  }

  displayFnLaboratorio(options: Laboratorio[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.nome : '';
    };
  }

  searchLaboratoryDomain(): void {
    const query_string = this.currentRecord
      .laboratory_domain_id as unknown as string;
    const query = new Query({
      key: 'name',
      value: query_string,
      isNumeric: false,
    });
    // console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectLaboratoryDomain.next(null);
  }

  displayFnLaboratoryDomain(options: LaboratoryDomain[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.name : '';
    };
  }

}