import { Query } from '../model/query.model';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuperUser } from '../model/super-user.model';
import { SuperUserService } from '../service/super-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap, debounceTime } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-super-user',
  templateUrl: './super-user.component.html',
  styleUrls: ['./super-user.component.css']
})
export class SuperUserComponent implements OnInit, AfterViewInit {
  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;
  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;


  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  onEdit = false;
  onCreate = false;

  displayedColumns = ['name', 'email', 'admin', 'action'];

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private superUserService: SuperUserService,
  ) {
    this.currentRecord = new SuperUser({});
    this.record ||= new SuperUser({});
  }

  ngOnInit(): void {
    this.superUserService.countRegisters().subscribe((totalCount) => {
      this.totalCount = totalCount;
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
    this.superUserService
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
    console.table(this.currentRecord);
    this.onCreate = false;
    this.onEdit = false;
    this.superUserService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.superUserService.showMessage('Administrador criado com sucesso!');
    });

    this.currentRecord = new SuperUser({});
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.superUserService.update(this.currentRecord).subscribe(() => {
      this.superUserService.showMessage('Administrador atualizado com sucesso!');
    });

    this.currentRecord = new SuperUser({});
  }

  atualizar(row: SuperUser): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new SuperUser({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("entrou no if do result");
        this.superUserService.delete(id)
          .subscribe(() => {
            this.superUserService.showMessage('Administrador apagado com sucesso!');

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

}