import { Query } from '../../model/query.model';
import { LaboratoryGetFilterReadDataSource } from './laboratory-get-filter-read-datasource';
import { LaboratoryGetFilterService } from '../../service/laboratory-get-filter.service';
import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { tap } from 'rxjs/operators';import { merge } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
    selector: 'app-laboratory-get-filter-read',
    templateUrl: './laboratory-get-filter-read.component.html',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, RouterLink, MatPaginatorModule, NgIf, MatProgressSpinnerModule, AsyncPipe]
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
    this.dataSource.loadLaboratoryGetFilters('id', 'desc', 0, 5, null);
    this.laboratoryGetFilterService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    // reseta o paginador depois de ordenar
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // Na ordenação ou paginação, carrega uma nova página
    merge(this.sort.sortChange, this.paginator.page)
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
