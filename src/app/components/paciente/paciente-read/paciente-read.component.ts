import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { merge } from 'rxjs';
import { Paciente } from '../../model/paciente.model';
import { PacienteService } from 'src/app/components/service/paciente.service';
import { Query } from '../../model/query.model';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-paciente-read',
    templateUrl: './paciente-read.component.html',
    standalone: true,
    imports: [RouterLink, MatIconModule, MatFormFieldModule,
       MatInputModule, MatTableModule, MatSortModule,
       MatButtonModule, MatDialogModule, MatPaginatorModule, SlicePipe]
})
export class PacienteReadComponent implements AfterViewInit, OnInit {

  displayedColumns =
  ['Nome',
    'RG',
    'CPF',
    'Email',
    'Telefone',
    'Celular',
    'Operacoes'];
  dataSource: Paciente[] = [];
  totalCount!: number;
  currentPaciente = 0;

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any; 
  // Pega o componente do html e disponibiliza pro tps

  queries: Query[] = [];
  msgErro = '';
  page = 0;

  noMorePages = false;

  constructor(private pacienteService: PacienteService,
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
    this.pacienteService.count().subscribe((totalCount: number) => {
      this.totalCount = totalCount;
    });
    this.loadBack('id', 'desc', 0, 5, this.queries);
  }

  ngAfterViewInit(): void {
    // executar apos ser desenhado a pagina

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // reseta o paginador depois de ordenar

    // Na ordenação ou paginação, carrega uma nova página
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadBack()))
      .subscribe();
  }

  sortData(): void {
    // ordenação dos dados
    // adc +1 page
    this.paginator.pageIndex = 0;
    this.loadBack();
  }

  // TODO: #10 Iniciar discussao da padronizacao dos nomes de metodos
  loadBack(
    active: string = this.sort.active,
    sortDirection: string = this.sort.direction,
    pageIndex: number = this.paginator.pageIndex,
    pageSize: number =  this.paginator.pageSize,
    query: Query[] = this.queries): void {
    // Ponte com service
    this.pacienteService.read(
                              active,
                              sortDirection,
                              pageIndex,
                              pageSize,
                              query)
        .subscribe((pacientes) => {
        this.dataSource = pacientes; // usar dados do back para apresentar no front
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.pacienteService
        .delete(id)
        // .pipe(
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
