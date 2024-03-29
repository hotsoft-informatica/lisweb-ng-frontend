import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MarcacaoReadDataSource } from './marcacao-read-datasource';
import { MarcacaoService } from '../../service/marcacao.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { merge } from 'rxjs';
import { Query } from '../../model/query.model';
import { tap } from 'rxjs/operators';
import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { MarcacaoTipoPipe } from '../../../pipes/marcacao-tipo.pipe';
import { SlicePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-marcacao-read',
    templateUrl: './marcacao-read.component.html',
    standalone: true,
    imports: [RouterLink, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatButtonModule, MatDialogModule, MatPaginatorModule, SlicePipe, MarcacaoTipoPipe]
})
export class MarcacaoReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: MarcacaoReadDataSource;

  displayedColumns = [
    'nome',
    'tipo',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;

  query: Query[] = [];

  constructor(
    private marcacaoService: MarcacaoService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadMarcacoesPage();
  }

  ngOnInit(): void {
    this.dataSource = new MarcacaoReadDataSource(this.marcacaoService);
    // TODO: Tratar via config de paginacao, qtde por pagina
    this.dataSource.loadMarcacoes('id', 'desc', 0, 5, null);
    this.marcacaoService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    // reseta o paginador depois de ordenar
    this.sort.sortChange.subscribe(
      () => (this.paginator.pageIndex = 0));

    // Na ordenação ou paginação, carrega uma nova página
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadMarcacoesPage()))
      .subscribe();
  }

  loadMarcacoesPage() {
    this.dataSource.loadMarcacoes(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }

  deleteMarcacao(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.marcacaoService
          .delete(id)
          .subscribe(() => {
            this.router.navigate(['/marcacoes/read']).then(() => {
              window.location.reload();
            });
          });
      }
    });
  }
}
