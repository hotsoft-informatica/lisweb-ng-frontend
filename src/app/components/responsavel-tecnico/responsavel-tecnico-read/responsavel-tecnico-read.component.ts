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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-responsavel-tecnico-read',
  templateUrl: './responsavel-tecnico-read.component.html',
  styleUrls: ['./responsavel-tecnico-read.component.css']
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
    this.dataSource.loadResponsavelTecnico('id', 'desc', 1, 5, null);
    this.responsavelTecnicoService.countResponsavelTecnico().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
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
