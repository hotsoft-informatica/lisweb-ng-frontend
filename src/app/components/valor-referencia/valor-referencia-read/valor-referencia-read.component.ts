import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
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
import { ValorReferenciaSexoPipe } from '../../../pipes/valor-referencia.pipe';
import { SlicePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'app-valor-referencia-read',
    templateUrl: './valor-referencia-read.component.html',
    standalone: true,
    imports: [RouterLink, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatButtonModule, MatDialogModule, MatPaginatorModule, SlicePipe, ValorReferenciaSexoPipe]
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
    this.dataSource.loadValoresReferencia('id', 'desc', 0, 5, null);
    this.valorReferenciaService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    // reseta o paginador depois de ordenar
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // Na ordenação ou paginação, carrega uma nova página
    merge(this.sort.sortChange, this.paginator.page)
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
