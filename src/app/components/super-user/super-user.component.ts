import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit,
   ViewChild, TemplateRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { merge } from 'rxjs';
import { NgIf } from '@angular/common';
import { Query } from '../model/query.model';
import { SuperUser } from '../model/super-user.model';
import { SuperUserService } from '../service/super-user.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-super-user',
    templateUrl: './super-user.component.html',
    styleUrls: [],
    standalone: true,
    imports: [MatIconModule, NgIf, MatFormFieldModule,
       MatInputModule, FormsModule, MatSelectModule,
       MatOptionModule, MatButtonModule, MatTableModule,
       MatSortModule, MatDialogModule, MatPaginatorModule]
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
    this.superUserService.update(this.currentRecord).subscribe(() => {
      this.superUserService.showMessage('Administrador atualizado com sucesso!');
      this.onEdit = false;
      this.currentRecord = new SuperUser({});
    });

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
