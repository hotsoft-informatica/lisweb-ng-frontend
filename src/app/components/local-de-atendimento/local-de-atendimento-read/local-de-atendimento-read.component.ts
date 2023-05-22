import { LocalDeAtendimentoService } from './../../service/local-de-atendimento.service';
import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { LocalDeAtendimento } from '../../model/local-de-atendimento.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Query } from '../../model/query.model';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { SlicePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-local-de-atendimento-read',
    templateUrl: './local-de-atendimento-read.component.html',
    standalone: true,
    imports: [RouterLink, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatButtonModule, MatDialogModule, MatPaginatorModule, SlicePipe]
})
export class LocalDeAtendimentoReadComponent implements AfterViewInit, OnInit {

  displayedColumns =
  ['Nome',
    'CNES',
    'chave_internet',
    'Opercaoes'
  ];
  dataSource: LocalDeAtendimento[] = [];
  totalCount!: number;
  currentPaciente = 0;

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  // Pega o componente do html e disponibiliza pro tps
  @ViewChild(MatSort) sort: MatSort | any;

  queries: Query[] = [];
  msgErro = '';
  page = 0;

  noMorePages = false;

  constructor(private localdeatendimentoService: LocalDeAtendimentoService,
              public dialog: MatDialog) { }

    search(key: string, value: string, isNumeric: boolean= false): void {
      const query = new Query({ key, value, isNumeric });
      this.queries = this.queries.filter((q) => q.key !== key);
      this.queries.push(query);
      console.table(this.queries);
      this.paginator.pageIndex = 0;
      this.loadBack();
    }

    ngOnInit(): void {
      this.localdeatendimentoService.count().subscribe(
        (totalCount: number) => {
        this.totalCount = totalCount;
      });
      // TODO: Revisar junto a paginacao via config
      this.loadBack('id', 'desc', 0, 5, this.queries);
    }

    // executar apos ser desenhado a pagina
    ngAfterViewInit(): void {
      // reseta o paginador depois de ordenar
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

      // Na ordenação ou paginação, carrega uma nova página
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(tap(() => this.loadBack()))
        .subscribe();
    }

  loadBack(
    active: string = this.sort.active,
    sortDirection: string = this.sort.direction,
    pageIndex: number = this.paginator.pageIndex,
    pageSize: number =  this.paginator.pageSize,
    query: Query[] = this.queries): void { // Ponte com service
    this.localdeatendimentoService.read(
                              active,
                              sortDirection,
                              pageIndex,
                              pageSize,
                              query)
        .subscribe((locaisdeatendimentos) => {
        // usar dados do back para apresentar no front
        this.dataSource = locaisdeatendimentos;
        console.table(this.dataSource);
      });
  }

  // ordenação dos dados
  sortData(): void {
    // adc +1 page
    this.paginator.pageIndex = 0;
    // chama linha 62
    this.loadBack();
  }
  delete(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.localdeatendimentoService
        .delete(id)
        // TODO: .pipe(
        //   catchError(err => {
        //     console.table(err);
        //     alert('Não foi possivel excluir');
        //     return throwError(err);
        //   })
        // )
        .subscribe(() => {
          this.page = 0;
          this.loadBack();
        });
      }
    });
  }

  show(id: number): void{
    if (id > 0){
      this.currentPaciente = id;
    }
  }

}
