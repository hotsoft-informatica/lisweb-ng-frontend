import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { Query } from '../../model/query.model';
import { tap } from 'rxjs/operators';
import { Usuario } from '../../model/usuario.model';
import { UsuarioCreateComponent } from './../usuario-create/usuario-create.component';
import { UsuarioService } from '../../service/usuario.service';
import { UsuarioUpdateComponent } from './../usuario-update/usuario-update.component';

@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
})
export class UsuarioReadComponent implements AfterViewInit, OnInit {

  currentPaciente = 0;
  displayedColumns =
  [ 'nome',
    'login',
    'Cargo',
    'Grupos',
    'Operacoes'];
  dataSource: Usuario[] = [];
  totalCount!: number;
  currentUsuario = 0;

  queries: Query[] = [];
  msgErro = '';
  page = 1;

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any; // Pega o componente do html e disponibiliza pro tps

  constructor(private usuarioService: UsuarioService,
              public dialog: MatDialog) { }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(UsuarioCreateComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openDialogUpdate(id: string): void {
    const dialogRef = this.dialog.open(UsuarioUpdateComponent, {
      width: '450px',
      data: {
        id: {id}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  // TODO: ATUALIZAR PAGINAÇÃO APOS BUSCA.
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
    this.usuarioService.read(
                              active,
                              sortDirection,
                              pageIndex,
                              pageSize,
                              query)
        .subscribe((usuarios) => {
        this.dataSource = usuarios; // usar dados do back para apresentar no front
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.usuarioService
        .delete(id)
        // .pipe(
        //   catchError(err => {
        //     console.table(err);
        //     alert('Não foi possivel excluir');
        //     return throwError(err);
        //   })
        // )
        .subscribe(() => {
          this.page = 1;
          this.loadBack();
        });
      }
    });
  }
  ngOnInit(): void {
    this.usuarioService.count().subscribe((totalCount: number) => {
      this.totalCount = totalCount;
    });
    this.loadBack('id', 'desc', 0, 5, this.queries);
  }

  ngAfterViewInit(): void { // executar apos ser desenhado a pagina

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadBack()))
      .subscribe();
  }

  show(id: number): void{
    if (id > 0){
      this.currentPaciente = id;
    }
  }


}

