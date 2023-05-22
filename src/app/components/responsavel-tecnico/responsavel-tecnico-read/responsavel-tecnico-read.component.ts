import { merge } from 'rxjs';
import { Query } from "../../model/query.model";
import { ResponsavelTecnicoService } from "../../service/responsavel-tecnico.service";
import { ResponsavelTecnicoReadDataSource } from "./responsavel-tecnico-read.datasource";
import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, AsyncPipe, SlicePipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-responsavel-tecnico-read',
    templateUrl: './responsavel-tecnico-read.component.html',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, RouterLink, MatPaginatorModule, NgIf, MatProgressSpinnerModule, AsyncPipe, SlicePipe, DatePipe]
})
export class ResponsavelTecnicoReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: ResponsavelTecnicoReadDataSource;

  displayedColumns = [
    'id',
    'titulo',
    'assinatura',
    'conselho',
    'uf_conselho',
    'cpf',
    'created_at',
    'action'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  query: Query[] = [];

  constructor(private responsavelTecnicoService: ResponsavelTecnicoService) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadResponsavelTecnicoPage();
  }

  ngOnInit(): void {
    this.dataSource = new ResponsavelTecnicoReadDataSource(this.responsavelTecnicoService);
    this.dataSource.loadResponsavelTecnico('id', 'desc', 0, 5, null);
    this.responsavelTecnicoService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    // reseta o paginador depois de ordenar
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // Na ordenação ou paginação, carrega uma nova página
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadResponsavelTecnicoPage()))
      .subscribe();
  }

  loadResponsavelTecnicoPage() {
    this.dataSource.loadResponsavelTecnico(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }
}
