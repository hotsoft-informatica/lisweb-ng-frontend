import { Query } from '../../model/query.model';
import { LaboratoryDomainReadDataSource } from './laboratory-domain-read-datasource';
import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import {
  AfterViewInit,
  ElementRef,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
} from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
@Component({
  selector: 'app-laboratory-domain-read',
  templateUrl: './laboratory-domain-read.component.html',
  styleUrls: ['./laboratory-domain-read.component.css'],
})
export class LaboratoryDomainReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: LaboratoryDomainReadDataSource;
  displayedColumns = [
    'id',
    'name',
    'created_at',
    'updated_at',
    'version_id',
    'deleted',
    'sync_start_date',
    'sync_deadline',
    'criado_em',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any;

  query: Query[] = [];

  constructor(private laboratoryDomainService: LaboratoryDomainService) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric});
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadLaboratoryDomainsPage();
  }

  ngOnInit(): void {
    this.dataSource = new LaboratoryDomainReadDataSource(
      this.laboratoryDomainService
    );
    this.dataSource.loadLaboratoryDomains('id', 'desc', 1, 10, null);
    this.laboratoryDomainService
      .countLaboratoryDomains()
      .subscribe((totalCount) => {
        this.totalCount = totalCount;
      });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) //Na ordena????o ou pagina????o, carrega uma nova p??gina
      .pipe(tap(() => this.loadLaboratoryDomainsPage()))
      .subscribe();
  }

  loadLaboratoryDomainsPage() {
    this.dataSource.loadLaboratoryDomains(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }
}
