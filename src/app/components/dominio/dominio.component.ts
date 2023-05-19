import { ActivatedRoute, Router } from '@angular/router';
import { Dominio } from '../model/dominio.model';
import { DominioService } from '../service/dominio.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { Query } from '../model/query.model';
import { tap } from 'rxjs/operators';
import { timer, merge } from 'rxjs';
import { ViewChild, TemplateRef, Renderer2, AfterViewInit,
   OnInit, Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-dominio',
    templateUrl: './dominio.component.html',
    standalone: true,
    imports: [MatIconModule, NgIf, MatFormFieldModule,
       MatInputModule, FormsModule, MatButtonModule,
       MatTableModule, MatSortModule, MatDialogModule, MatPaginatorModule]
})
export class DominioComponent implements OnInit, AfterViewInit {
  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;

  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;

  displayedColumns = ['id', 'descricao', 'num_ordem', 'action'];

  @ViewChild('descricao') descricao!: ElementRef;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  onEdit = false;
  onCreate = false;

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private recordService: DominioService,
  ) {
    this.currentRecord = new Dominio({});
    this.record ||= new Dominio({});
  }

  ngOnInit(): void {
    this.recordService.count().subscribe((totalCount) => {
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
      if (this.descricao !== undefined) {
        this.renderer.selectRootElement(this.descricao["nativeElement"]).focus();
      }
    });
  }

  addGridData(): void {
    console.table(this.currentRecord);
    this.onCreate = true;
    this.onEdit = false;
    this.recordService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.recordService.showMessage('Domínio criado com sucesso!');
    });

    this.currentRecord = new Dominio({});
    this.onFocus();
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.update(this.currentRecord).subscribe((dominio) => {
      this.recordService.showMessage('Domínio atualizado com sucesso!');
      this.onFocus();
    });

    this.currentRecord = new Dominio({});
  }

  atualizar(row: Dominio): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
    this.onFocus();
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new Dominio({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("entrou no if do result");
        this.recordService.delete(id)
          .subscribe((record) => {
            this.recordService.showMessage('Domínio apagado com sucesso!');

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
