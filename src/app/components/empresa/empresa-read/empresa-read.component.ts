import { Query } from '../../model/query.model';
import { EmpresaService } from '../../service/empresa.service';
import { EmpresaReadDataSource } from './empresa-read-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-empresa-read',
  templateUrl: './empresa-read.component.html',
})
export class EmpresaReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: EmpresaReadDataSource;

  displayedColumns = [
    'id',
    'razao_social',
    'bairro',
    'endereco',
    'numero',
    'cidade',
    'cep',
    'uf',
    'telefone',
    'nome_contato',
    'created_at',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  query: Query[] = [];

  constructor(private empresaService: EmpresaService) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadEmpresasPage();
  }

  ngOnInit(): void {
    this.dataSource = new EmpresaReadDataSource(this.empresaService);
    this.dataSource.loadEmpresas('id', 'desc', 1, 5, null);
    this.empresaService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadEmpresasPage()))
      .subscribe();
  }

  loadEmpresasPage() {
    this.dataSource.loadEmpresas(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }
}
