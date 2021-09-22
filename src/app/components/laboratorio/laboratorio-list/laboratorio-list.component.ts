import {
  ViewChild,
  Component,
  AfterViewInit
} from '@angular/core';

import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Query } from '../../model/query.model';
import { Laboratorio } from '../../model/laboratorio.model';
import { LaboratorioService } from '../../service/laboratorio.service';

@Component({
  selector: 'app-laboratorio-read',
  templateUrl: './laboratorio-list.component.html',
  styleUrls: ['./laboratorio-list.component.css'],
})
export class LaboratorioListComponent implements AfterViewInit {
  totalCount!: number;
  dataSource = new MatTableDataSource<Laboratorio>();
  items: Laboratorio[] = [];
  displayedColumns = ['id', 'nome', 'serie', 'laboratory_domain_id', 'criado_em', 'action']
  loading = false;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | any;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  query: Query[] = [];

  constructor(
    private laboratorioService: LaboratorioService,
  ) {
  }

  search(key: string, value: string): void {
    const query = new Query({ key, value });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;

    this.loadPage(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  ngAfterViewInit(): void {
    // Load inicial
    this.loadPage();

    // Ajustes paginacao
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;

    // Reatividade - pulo do gato
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadPage(
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize
        ))
    ).subscribe();
  }

  loadPage(
    active: string = 'id',
    direction: string = 'desc',
    pageIndex: number = 0,
    pageSize: number = 10
  ): void{
    this.laboratorioService.findAll(
      this.query,
      active,
      direction,
      pageIndex,
      pageSize
    ).subscribe(data => {
      console.table(data);
      this.dataSource.data = data;

      // Contagem de registro e seta pagina inicial
      this.laboratorioService.count(this.query,
        active,
        direction,
        pageIndex,
        pageSize
      ).subscribe((total) => {
        console.table(total);
        this.totalCount = total as unknown as number;
        this.paginator.totalCount = this.totalCount;
        this.dataSource.data.length = this.totalCount;
      });
    });
  }

  delete(id: number): void {
    this.laboratorioService
      .delete(id)
      .subscribe(() => {
        this.laboratorioService.showMessage(
          'Laboratório excluído com sucesso!'
        );
        this.loadPage();
      });
  }
}
