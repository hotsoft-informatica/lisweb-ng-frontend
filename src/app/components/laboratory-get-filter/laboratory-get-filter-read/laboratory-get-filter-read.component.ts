import { Query } from '../../model/query.model';
import { LaboratoryGetFilterReadDataSource } from './laboratory-get-filter-read-datasource';
import { LaboratoryGetFilterService } from '../../service/laboratory-get-filter.service';
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
  selector: 'app-laboratory-get-filter-read',
  templateUrl: './laboratory-get-filter-read.component.html',
  styleUrls: ['./laboratory-get-filter-read.component.css'],
})
export class LaboratoryGetFilterReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: LaboratoryGetFilterReadDataSource;
  displayedColumns = [
    'id',
    'name',
    'client_server_table_id',
    'custom_where',
    'action'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any;

  query: Query[] = [];

  constructor(private laboratoryGetFilterService: LaboratoryGetFilterService) { }

  search(key: string, value: string, isNumeric: boolean= false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadLaboratoryGetFilterPage();
  }

  ngOnInit(): void {
    this.dataSource = new LaboratoryGetFilterReadDataSource(this.laboratoryGetFilterService);
    this.dataSource.loadLaboratoryGetFilters('id', 'desc', 1, 10, null);
    this.laboratoryGetFilterService.countLaboratoryGetFilter().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadLaboratoryGetFilterPage()))
      .subscribe();
  }

  loadLaboratoryGetFilterPage() {
    this.dataSource.loadLaboratoryGetFilters(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }
}
