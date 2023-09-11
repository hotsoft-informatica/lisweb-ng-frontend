import { PrioridadeColeta } from '../model/prioridade-coleta.model';
import { PrioridadeColetaService } from '../service/prioridade-coleta.service';
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { Query } from '../model/query.model';
import { tap } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit,
  ViewChild, TemplateRef, Renderer2, Input, ElementRef
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
import { Subject, of } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TipoPrioridadePipe } from 'src/app/pipes/tipo-prioridade.pipe';
import { ValorSimNaoStatusPipe } from 'src/app/pipes/sim-nao-status.pipe';

@Component({
  selector: 'app-prioridade-coleta',
  templateUrl: './prioridade-coleta.component.html',
  standalone: true,
  imports: [ FormsModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule,
    MatInputModule, NgIf, NgFor, NgStyle, DatePipe, MatSelectModule, MatOptionModule,
    MatAutocompleteModule, TipoPrioridadePipe, ValorSimNaoStatusPipe
  ]
})
export class PrioridadeColetaComponent implements OnInit, AfterViewInit {
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
  nomeDuplicado: boolean = false;

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'descricao',
    'tipo_prioridade',
    'prioridade_padrao_coleta',
    'prioridade',
    'action'
  ];

  constructor(
    public dialog: MatDialog,
    private recordService: PrioridadeColetaService
  ) {
    this.currentRecord = new PrioridadeColeta({});
    this.record ||= new PrioridadeColeta({});
  }

  ngOnInit(): void {
    this.recordService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });

    const query = new Query({ key: '', value: '', isNumeric: false });
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
    this.currentRecord = new PrioridadeColeta({});
  }

  addGridData(): void {
    console.table(this.currentRecord);
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.create(this.currentRecord).subscribe({
      next: (v) => {
        this.records.unshift(v);
        this.datasource.data = [...this.records];
        this.recordService.showMessage('Setor atendimento criado com sucesso!');
        this.loadPage();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
    this.currentRecord = new PrioridadeColeta({});
  }

  updateGridData(): void {
    this.recordService.update(this.currentRecord).subscribe(() => {
      this.recordService.showMessage('Setor atendimento atualizado com sucesso!');
      this.onEdit = false;
      this.loadPage();
    });
  }

  atualizar(row: PrioridadeColeta): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
  }

  cancelar(): void {
    this.currentRecord = new PrioridadeColeta({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("entrou no if do result");
        this.recordService.delete(id)
          .subscribe(() => {
            this.recordService.showMessage('Unidade de Medida apagada com sucesso!');

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

  duplicidadeDescricao(): any {
    const query = new Query({ key: 'nome_eq', value: this.currentRecord.nome, isNumeric: false });

    if (this.currentRecord.nome == ''){
      this.nomeDuplicado = false;
    } else {
      this.recordService.find(
        'id',
        'asc',
        0,
        1,
        [query]
      ).subscribe( (prioridadeColetas) => {
        console.table(prioridadeColetas);
        if (prioridadeColetas.length > 0) {
          this.nomeDuplicado = true;
        } else {
          this.nomeDuplicado = false;
        }
      })
    }
  }

}
