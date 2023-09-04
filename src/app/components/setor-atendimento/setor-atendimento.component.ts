import { SetorAtendimento } from '../model/setor-atendimento.model';
import { SetorAtendimentoService } from '../service/setor-atendimento.service';
import { LocalDeAtendimento } from '../model/local-de-atendimento.model';
import { LocalDeAtendimentoService } from '../service/local-de-atendimento.service';
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

@Component({
  selector: 'app-setor-atendimento',
  templateUrl: './setor-atendimento.component.html',
  standalone: true,
  imports: [ FormsModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule,
    MatInputModule, NgIf, NgFor, NgStyle, DatePipe, MatSelectModule, MatOptionModule,
    MatAutocompleteModule
  ]

})
export class SetorAtendimentoComponent implements OnInit, AfterViewInit {
  @Input('locais_atendimento') locais_atendimento: LocalDeAtendimento[] =[];
  local_atendimento: LocalDeAtendimento;

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

  @ViewChild('local_atendimento_id') fornecedor_id!: ElementRef;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  subjectLocalAtendimento: Subject<any> = new Subject();

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'local_atendimento_id',
    'nome',
    'intervalo',
    'maximo_atendimento',
    'action'
  ];

  constructor(
    public dialog: MatDialog,
    private localDeAtendimentoService: LocalDeAtendimentoService,
    private setorAtendimentoService: SetorAtendimentoService
  ) {
    this.currentRecord = new SetorAtendimento({});
    this.record ||= new SetorAtendimento({});
    this.local_atendimento ||= new LocalDeAtendimento({});
    this.currentRecord.local_atendimento ||= new LocalDeAtendimento({});
  }

  ngOnInit(): void {
    this.setorAtendimentoService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });

    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectLocalAtendimento.subscribe(() => {
      this.localDeAtendimentoService
        .find('id', 'asc', 0, 90, this.queries)
        .subscribe((locais_atendimento) => {
          console.table(this.queries);
          if (locais_atendimento.length > 0) {
            this.locais_atendimento = locais_atendimento;
          }
        });
    });
    this.subjectLocalAtendimento.next(null);
  }

  ngAfterViewInit() {
    this.loadPage();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadPage()))
      .subscribe();
  }

  loadPage() {
    this.setorAtendimentoService
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
    this.currentRecord = new SetorAtendimento({});
  }

  addGridData(): void {
    console.table(this.currentRecord);
    this.onCreate = false;
    this.onEdit = false;
    this.setorAtendimentoService.create(this.currentRecord).subscribe({
      next: (v) => {
        this.records.unshift(v);
        this.datasource.data = [...this.records];
        this.setorAtendimentoService.showMessage('Setor atendimento criado com sucesso!');
        this.loadPage();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
    this.currentRecord = new SetorAtendimento({});
  }

  updateGridData(): void {
    this.setorAtendimentoService.update(this.currentRecord).subscribe(() => {
      this.setorAtendimentoService.showMessage('Setor atendimento atualizado com sucesso!');
      this.onEdit = false;
      this.loadPage();
    });
  }

  atualizar(row: SetorAtendimento): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
  }

  cancelar(): void {
    this.currentRecord = new SetorAtendimento({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("entrou no if do result");
        this.setorAtendimentoService.delete(id)
          .subscribe(() => {
            this.setorAtendimentoService.showMessage('Unidade de Medida apagada com sucesso!');

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

  searchLocalAtendimento(): void {
    const query_string = this.currentRecord
      .local_atendimento_id as unknown as string;
    const query = new Query({
      key: 'nome',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    if (query_string != null) {
      this.queries.push(query);
    }
    this.subjectLocalAtendimento.next(null);
  }

  displayFnLocalAtendimento(options: LocalDeAtendimento[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.nome : '';
    };
  }

  duplicidadeNome(): any {
    const query = new Query({ key: 'nome_eq', value: this.currentRecord.nome, isNumeric: false });

    if (this.currentRecord.nome == ''){
      this.nomeDuplicado = false;
    } else {
      this.setorAtendimentoService.find(
        'id',
        'asc',
        0,
        1,
        [query]
      ).subscribe( (setoresAtendimento) => {
        console.table(setoresAtendimento);
        if (setoresAtendimento.length > 0) {
          this.nomeDuplicado = true;
        } else {
          this.nomeDuplicado = false;
        }
      })
    }
  }
}
