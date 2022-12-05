import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { Query } from '../../model/query.model';
import { RequisicaoReadDataSource } from './requisicao-read-datasource';
import { RequisicaoService } from '../../service/requisicao.service';
import { RequisicaoUpdateComponent } from './../requisicao-update/requisicao-update.component';
import { tap } from 'rxjs/operators';


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

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;

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
    this.dataSource.loadRequisicoes('id', 'desc', 1, 5, null);
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

  delete(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.requisicaoService
        .delete(id)
        .subscribe(() => {
          // this.page = 1;
          // this.loadBack();
        });
      }
    });
  }
  openDialogEdit(id: number): void {
    this.requisicaoService.readById(id).subscribe((requisicao) =>{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        requisicao: requisicao,
        width: '90%',
        disableClose: true,
      }

      const dialogRef = this.dialog.open(RequisicaoUpdateComponent, dialogConfig );
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })
  }
}
