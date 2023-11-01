import { ActivatedRoute, Router } from '@angular/router';
import { UnidadeMedidaLm } from '../model/unidade-medida-lm.model';
import { UnidadeMedidaLmService } from '../service/unidade-medida-lm.service';
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { Query } from '../model/query.model';
import { tap } from 'rxjs/operators';
import {
  Component, OnInit, AfterViewInit,
  ViewChild, TemplateRef, Renderer2
} from '@angular/core';

// imports referentes ao standalone:
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor, NgStyle, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@Component({
  selector: 'app-unidade-medida-lm',
  standalone: true,
  templateUrl: './unidade-medida-lm.component.html',
  imports: [FormsModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule,
    MatInputModule, NgIf, NgFor, NgStyle, DatePipe, MatSelectModule, MatOptionModule
  ]
})
export class UnidadeMedidaLmComponent implements OnInit, AfterViewInit {
  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;
  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;
  unidadeDuplicada: boolean = false;

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  onEdit = false;
  onCreate = false;

  displayedColumns = ['unidade', 'descricao', 'action'];

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private unidadeMedidaLmService: UnidadeMedidaLmService
  ) {
    this.currentRecord = new UnidadeMedidaLm({});
    this.record ||= new UnidadeMedidaLm({});
  }

  ngOnInit(): void {
    this.unidadeMedidaLmService.count().subscribe((totalCount) => {
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
    this.unidadeMedidaLmService
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
    this.currentRecord = new UnidadeMedidaLm({});
  }

  addGridData(): void {
    console.table(this.currentRecord);
    this.onCreate = false;
    this.onEdit = false;
    this.unidadeMedidaLmService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.unidadeMedidaLmService.showMessage('Unidade de Medida criada com sucesso!');
    });

    this.currentRecord = new UnidadeMedidaLm({});
  }

  updateGridData(): void {
    this.unidadeMedidaLmService.update(this.currentRecord).subscribe(() => {
      this.unidadeMedidaLmService.showMessage('Unidade de Medida atualizada com sucesso!');
      this.onEdit = false;
    });
  }

  atualizar(row: UnidadeMedidaLm): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
  }

  cancelar(): void {
    this.currentRecord = new UnidadeMedidaLm({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("entrou no if do result");
        this.unidadeMedidaLmService.delete(id)
          .subscribe(() => {
            this.unidadeMedidaLmService.showMessage('Unidade de Medida apagada com sucesso!');

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

  duplicidadeUnidade(): void {
    const query = new Query({ key: 'unidade_eq', value: this.currentRecord.unidade, isNumeric: false });
    // this.query = this.query.filter((q) => q.key !== key);
    // this.query.push(query);
    if (this.currentRecord.unidade == ''){
      this.unidadeDuplicada = false;
    } else {
      this.unidadeMedidaLmService.find(
        'id',
        'asc',
        0,
        1,
        [query]
      ).subscribe((unidades) => {
        console.table(unidades);
        if (unidades.length > 0) {
          this.unidadeDuplicada = true;
        } else {
          this.unidadeDuplicada = false;
        }
      })
    }
  }

}
