import { MatDialogConfig } from '@angular/material/dialog';
import { MetodoExameService } from './../../service/metodo-exame.service';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MetodoExameComponent } from './../../metodo-exame/metodo-exame.component';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from '../../service/usuario.service';
import { merge } from 'rxjs';
import { Query } from '../../model/query.model';
import { tap } from 'rxjs/operators';
import { MetodoExame } from '../../model/metodo-exame.model';
import { MatPaginator } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-metodos-exames-read',
  templateUrl: './metodos-exames-read.component.html',
  styleUrls: ['./metodos-exames-read.component.css']
})
export class MetodosExamesReadComponent implements AfterViewInit, OnInit {

  currentMetodosExames = 0;
  displayedColumns =
  [ 'descricao',
    'bibliografia',
    'Operacoes'];
  dataSource: MetodoExame[] = [];
  totalCount!: number;
  currentUsuario = 0;

  queries: Query[] = [];
  msgErro = '';
  page = 1;

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;

  @ViewChild(MatSort) sort: MatSort | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(public metodoExameService: MetodoExameService,
              public dialog: MatDialog,
             ){  }

  search(key: string, value: string, isNumeric: boolean= false): void {
    const query = new Query({ key, value, isNumeric });
    this.queries = this.queries.filter((q) => q.key !== key);
    this.queries.push(query);
    console.table(this.queries);
    this.paginator.pageIndex = 0;
    this.loadBack();
  }
  sortData(): void { // ordenação dos dados
    this.paginator.pageIndex = 0; // adc +1 page
    this.loadBack(); // chama linha 62
  }
  loadBack(
    active: string = this.sort.active,
    sortDirection: string = this.sort.direction,
    pageIndex: number = this.paginator.pageIndex,
    pageSize: number =  this.paginator.pageSize,
    query: Query[] = this.queries): void { // Ponte com service
    this.metodoExameService.read(
                              active,
                              sortDirection,
                              pageIndex,
                              pageSize,
                              query)
        .subscribe((metodosExames) => {
        this.dataSource = metodosExames; // usar dados do back para apresentar no front
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.metodoExameService
        .delete(id)
        .subscribe(() => {
          this.page = 1;
          this.loadBack();
        });
      }
    });
  }

  openDialogCreate(): void {
    const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        width: '750px',
      }
      const dialogRef = this.dialog.open(MetodoExameComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      });
    }

  openDialogEdit(id: number): void {
    this.metodoExameService.readById(id).subscribe((metodoExame) =>{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        metodoExame: metodoExame,
        width: '750px',
      }
      const dialogRef = this.dialog.open(MetodoExameComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      });
    })
  }

  ngOnInit(): void {
    this.metodoExameService.countMetodoExame().subscribe((totalCount: number) => {
      this.totalCount = totalCount;
    });
    this.loadBack('id', 'desc', 0, 10, this.queries);
  }

  ngAfterViewInit(): void { // executar apos ser desenhado a pagina

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadBack()))
      .subscribe();
  }

  show(id: number): void{
    if (id > 0){
      this.currentMetodosExames = id;
    }
  }


}
