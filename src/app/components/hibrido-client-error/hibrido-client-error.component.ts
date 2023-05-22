import { Component, OnInit, AfterViewInit, ViewChild,
   TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HibridoClientError } from '../model/hibrido-client-error.model';
import { HibridoClientErrorService } from '../service/hibrido-client-error.service';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { merge } from 'rxjs';
import { Query } from '../model/query.model';
import { tap } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-hibrido-client-error',
  templateUrl: './hibrido-client-error.component.html',
  standalone: true,
  imports: [MatPaginatorModule, DatePipe, MatTableModule, NgIf,
    MatFormFieldModule, MatIconModule, MatInputModule, FormsModule]
})

export class HibridoClientErrorComponent implements OnInit, AfterViewInit {
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

  queries: Query[] = [];

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'version_id',
    'data_hora',
    'http_action',
    'tabela',
    'exception_class',
    'mensagem'
  ];

  searchGroup = new FormGroup({
    version_id: new FormControl(),
    tabela: new FormControl(),
    mensagem: new FormControl()
  });

  constructor(
    public dialog: MatDialog,
    private recordService: HibridoClientErrorService
  ) {
    this.currentRecord = new HibridoClientError({});
    this.record ||= new HibridoClientError({});
  }

  ngOnInit(): void {
    this.recordService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.loadPage();
    // reseta o paginador depois de ordenar
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // Na ordenação ou paginação, carrega uma nova página
    merge(this.sort.sortChange, this.paginator.page)
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

  search(key: string, value: string, isNumeric: boolean = false, load = true): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    if (load) {
      this.loadPage();
    }
  }

  dateTimeRangeFilter(): void {
    this.search('data_hora_gt', this.currentRecord.data_hora_gt, false, false);
    this.search('data_hora_lt', this.currentRecord.data_hora_lt, false, true);
  }

  cancelar(): void {
    this.currentRecord = new HibridoClientError({});
  }
}
