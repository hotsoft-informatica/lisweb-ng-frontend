import { MatDialogConfig } from '@angular/material/dialog';
import { RequisicaoUpdateComponent } from './../requisicao-update/requisicao-update.component';
import { Query } from '../../model/query.model';
import { RequisicaoReadDataSource } from './requisicao-read-datasource';
import { RequisicaoService } from '../../service/requisicao.service';
import {
  AfterViewInit,
  ElementRef,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  filter,
} from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-requisicao-read',
  templateUrl: './requisicao-read.component.html',
  styleUrls: ['./requisicao-read.component.css'],
})
export class RequisicaoReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: RequisicaoReadDataSource;
  displayedColumns = [
    'id',
    'num_protocolo',
    'total',
    'valor_cobertura',
    'valor_desconto',
    'guia',
    'observacao',
    'data',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any;

  query: Query[] = [];

  constructor(private requisicaoService: RequisicaoService,
              public dialog: MatDialog) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadRequisicoesPage();
  }

  ngOnInit(): void {
    this.dataSource = new RequisicaoReadDataSource(this.requisicaoService);
    this.dataSource.loadRequisicoes('id', 'desc', 1, 10, null);
    this.requisicaoService.countRequisicoes().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadRequisicoesPage()))
      .subscribe();
  }

  loadRequisicoesPage() {
    this.dataSource.loadRequisicoes(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }
  openDialogEdit(id: number): void {
    this.requisicaoService.readById(id).subscribe((requisicao) =>{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        requisicao: requisicao,
        width: '750px',
      }

      const dialogRef = this.dialog.open(RequisicaoUpdateComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })
  }
}
