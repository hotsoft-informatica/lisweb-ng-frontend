import { Query } from '../../model/query.model';
import { OperadoraReadDataSource } from './operadora-read-datasource';
import { OperadoraService } from '../../service/operadora.service';
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
  selector: 'app-operadora-read',
  templateUrl: './operadora-read.component.html',
  styleUrls: ['./operadora-read.component.css'],
})
export class OperadoraReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: OperadoraReadDataSource;

  displayedColumns = [
    'id',
    'laboratorio_id',
    'original_id',
    'created_at',
    'updated_at',
    'version_id',
    'laboratory_domain_id',
    'deleted',
    'empresa_id',
    'criado_em',
    'changed_by_lab_id',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any;

  query: Query[] = [];

  constructor(private operadoraService: OperadoraService) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadOperadorasPage();
  }

  ngOnInit(): void {
    this.dataSource = new OperadoraReadDataSource(this.operadoraService);
    this.dataSource.loadOperadoras('id', 'desc', 1, 10, null);
    this.operadoraService.countOperadoras().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadOperadorasPage()))
      .subscribe();
  }

  loadOperadorasPage() {
    this.dataSource.loadOperadoras(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }
}
