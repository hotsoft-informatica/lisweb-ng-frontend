import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit,
  ViewChild, TemplateRef, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorSincronizacao } from '../model/fornecedor-sincronizacao.model';
import { FornecedorSincronizacaoService } from '../service/fornecedor-sincronizacao.service';
import { Empresa } from '../model/empresa.model';
import { EmpresaService } from '../service/empresa.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { merge } from 'rxjs';
import { Query } from '../model/query.model';
import { Subject, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FornecedorSincronizacaoEmpresaComponent } from './fornecedor-sincronizacao-empresa/fornecedor-sincronizacao-empresa.component';
import { FornecedorSincronizacaoEnderecoComponent } from './fornecedor-sincronizacao-endereco/fornecedor-sincronizacao-endereco.component';

@Component({
  selector: 'app-fornecedor-sincronizacao',
  standalone: true,
  templateUrl: './fornecedor-sincronizacao.component.html',
  imports: [
    CommonModule, MatIconModule, NgIf, MatFormFieldModule, MatInputModule, FormsModule,
    MatAutocompleteModule, NgIf, NgFor, MatOptionModule, MatSelectModule, MatTabsModule,
    MatButtonModule, MatTableModule, MatSortModule, MatDialogModule, MatPaginatorModule,
    MatDatepickerModule, FornecedorSincronizacaoEmpresaComponent,FornecedorSincronizacaoEnderecoComponent
  ]
})
export class FornecedorSincronizacaoComponent implements OnInit, AfterViewInit {
  empresa!: Empresa;
  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;
  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;

  @ViewChild('empresa_id') empresa_id!: ElementRef;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  queries: Query[] = [];
  subjectEmpresa: Subject<any> = new Subject();

  onEdit = false;
  onCreate = false;

  displayedColumns = [
    'nome',
    'action'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private recordService: FornecedorSincronizacaoService,
    private empresaService: EmpresaService
  ) {
    this.currentRecord = new FornecedorSincronizacao({});
    this.currentRecord.empresa ||= new Empresa({});
    this.record ||= new FornecedorSincronizacao({});

    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.id > 0) {
      this.load(this.id);
    }
  }

  load(id: number): void {
    this.recordService.readById(id).subscribe((currentRecord) => {
      this.empresaService
        .readById(this.currentRecord.empresa_id as number) // relacao empresa local
        .subscribe ((empresa) => {
          // TODO: Revisar
          this.currentRecord.empresa = empresa;
          this.currentRecord.empresa_id = empresa.id
        });
    });
  }

  ngOnInit(): void {
    this.recordService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });

    const query = new Query({ key: '', value: '', isNumeric: false });

    this.currentRecord ||= new FornecedorSincronizacao({});

    const empresa_id = this.currentRecord.empresa_id || 0

    if (empresa_id > 0) {
      this.empresaService.readById(this.currentRecord.empresa_id as number).subscribe(
        (empresa) => {
          this.currentRecord.empresa = empresa;
          this.currentRecord.empresa_id = empresa.id
      });
    }

  }

  ngAfterViewInit() {
    this.loadPage();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadPage()))
      .subscribe();
  }

  loadPage() {
    forkJoin({
      fornecedores: this.recordService
      .find(this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize, this.query)
    }).subscribe( resultado => {
      this.records = resultado.fornecedores;
      this.datasource.data = [...this.records];
    })
  }

  new(): void {
    this.onCreate = true;
  }

  addGridData(): void {
    this.onCreate = false;
    this.onEdit = false;

    if(this.id > 0){
      console.warn(this.id);
      this.updateGridData();
    }else{
      this.empresaService.create(this.currentRecord.empresa).subscribe((empresa) => {
        this.currentRecord.empresa = empresa;
        this.currentRecord.empresa_id = empresa.id;
        this.recordService.create(this.currentRecord).subscribe(() => {
          this.records.unshift(this.record);
          this.datasource.data = [...this.records];
          this.recordService.showMessage('Fornecedor cadastrado com sucesso!');
          this.loadPage();
        });
        this.currentRecord = new FornecedorSincronizacao({});
      });
    }
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.update(this.currentRecord).subscribe((recurso) => {
      this.recordService.showMessage('Fornecedor atualizado com sucesso!');
      this.loadPage();
    });
    this.currentRecord = new FornecedorSincronizacao({});
  }

  atualizar(row: FornecedorSincronizacao): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new FornecedorSincronizacao({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recordService.delete(id).subscribe((record) => {
          this.recordService.showMessage('Fornecedor apagado com sucesso!');
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
