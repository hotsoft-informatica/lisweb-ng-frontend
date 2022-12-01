import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { Query } from 'src/app/components/model/query.model';
import { tap } from 'rxjs/operators';
import { ValorReferenciaReadDataSource } from './valor-referencia-read-datasource';
import { ValorReferenciaService } from 'src/app/components/service/valor-referencia.service';
import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
@Component({
  selector: 'app-valor-referencia-read',
  templateUrl: './valor-referencia-read.component.html',
})
export class ValorReferenciaReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: ValorReferenciaReadDataSource;

  displayedColumns = [
    'sexo',
    'val_minimo',
    'val_maximo',
    'val_minimo_absurdo',
    'val_maximo_absurdo',
    'idade_minima',
    'idade_maxima',
    'val_minimo_critico',
    'val_maximo_critico',
    'action'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;

  query: Query[] = [];

  constructor(
    private valorReferenciaService: ValorReferenciaService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadValoresReferenciaPage();
  }

  ngOnInit(): void {
    this.dataSource = new ValorReferenciaReadDataSource(this.valorReferenciaService);
    this.dataSource.loadValoresReferencia('id', 'desc', 1, 10, null);
    this.valorReferenciaService.countValoresReferencia().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadValoresReferenciaPage()))
      .subscribe();
  }

  loadValoresReferenciaPage() {
    this.dataSource.loadValoresReferencia(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }

  deleteValorReferencia(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.valorReferenciaService
          .delete(id)
          .subscribe(() => {
            this.router.navigate(['/valores_referencia/read']).then(() => {
              window.location.reload();
            });
          });
      }
    });
  }
}
