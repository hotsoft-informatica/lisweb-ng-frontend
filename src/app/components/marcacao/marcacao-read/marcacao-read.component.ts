import { Query } from '../../model/query.model';
import { MarcacaoService } from '../../service/marcacao.service';
import { MarcacaoReadDataSource } from './marcacao-read-datasource';
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

@Component({
  selector: 'app-marcacao-read',
  templateUrl: './marcacao-read.component.html',
  styleUrls: ['./marcacao-read.component.css']
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

  query: Query[] = [];

  constructor(private marcacaoService: MarcacaoService) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadMarcacoesPage();
  }

  ngOnInit(): void {
    this.dataSource = new MarcacaoReadDataSource(this.marcacaoService);
    this.dataSource.loadMarcacoes('id', 'desc', 1, 10, null);
    this.marcacaoService.countMarcacaoes().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
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

}
