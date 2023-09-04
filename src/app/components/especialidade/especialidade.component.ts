import { ActivatedRoute, Router } from '@angular/router';
import { Especialidade } from '../model/especialidade.model';
import { EspecialidadeService } from '../service/especialidade.service';
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

@Component({
  selector: 'app-especialidade',
  templateUrl: './especialidade.component.html',
  standalone: true,
  imports: [FormsModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule,
    MatInputModule, NgIf, NgFor, NgStyle, DatePipe
  ]
})

export class EspecialidadeComponent implements OnInit, AfterViewInit {
  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;
  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;
  nomeDuplicado: boolean = false;

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  onEdit = false;
  onCreate = false;

  displayedColumns = ['cbos', 'nome', 'action'];

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private especialidadeService: EspecialidadeService
  ) {
    this.currentRecord = new Especialidade({});
    this.record ||= new Especialidade({});
  }

  ngOnInit(): void {
    this.especialidadeService.count().subscribe((totalCount) => {
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
    this.especialidadeService
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
    this.currentRecord = new Especialidade({});
  }

  addGridData(): void {
    console.table(this.currentRecord);
    this.onCreate = false;
    this.onEdit = false;
    this.especialidadeService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.especialidadeService.showMessage('Especialidade criada com sucesso!');
    });

    this.currentRecord = new Especialidade({});
  }

  updateGridData(): void {
    this.especialidadeService.update(this.currentRecord).subscribe(() => {
      this.especialidadeService.showMessage('Especialidade atualizada com sucesso!');
      this.onEdit = false;
    });
  }

  atualizar(row: Especialidade): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
  }

  cancelar(): void {
    this.currentRecord = new Especialidade({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("entrou no if do result");
        this.especialidadeService.delete(id)
          .subscribe(() => {
            this.especialidadeService.showMessage('Especialidade apagada com sucesso!');

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

  duplicidadeNome(): void {
    const query = new Query({ key: 'nome_eq', value: this.currentRecord.nome, isNumeric: false });
    // this.query = this.query.filter((q) => q.key !== key);
    // this.query.push(query);
    if (this.currentRecord.nome == ''){
      this.nomeDuplicado = false;
    } else {
      this.especialidadeService.find(
        'id',
        'asc',
        0,
        1,
        [query]
      ).subscribe((especialidades) => {
        console.table(especialidades);
        if (especialidades.length > 0) {
          this.nomeDuplicado = true;
        } else {
          this.nomeDuplicado = false;
        }
      })
    }
  }
}
