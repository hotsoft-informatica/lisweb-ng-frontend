import { Query } from 'src/app/components/model/query.model';
import { ValorReferenciaService } from 'src/app/components/service/valor-referencia.service';
import { ValorReferenciaReadDataSource } from './valor-referencia-read-datasource';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewInit,
  ElementRef,
  ViewChild,
  Component,
  OnInit,
  TemplateRef,
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
@Component({
  selector: 'app-valor-referencia-read',
  templateUrl: './valor-referencia-read.component.html',
  styleUrls: ['./valor-referencia-read.component.css']
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
    'val_maximo_critico',
    'val_minimo_critico',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;

  query: Query[] = [];

  constructor(
    private valorReferenciaService: ValorReferenciaService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
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

}