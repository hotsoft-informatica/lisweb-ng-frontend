import { Query } from '../../model/query.model';
import { EmpresaService } from '../../service/empresa.service';
import { EmpresaReadDataSource } from './empresa-read-datasource';
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
  selector: 'app-empresa-read',
  templateUrl: './empresa-read.component.html',
  styleUrls: ['./empresa-read.component.css'],
})
export class EmpresaReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: EmpresaReadDataSource;

  displayedColumns = [
    'id',
    'razao_social',
    'cnpj',
    'inscricao_estadual',
    'inscricao_estadual',
    'endereco',
    'bairro:',
    'cep',
    'cidade',
    'uf',
    'telefone:',
    'fax',
    'nome_contato',
    'email',
    'cod_ibge_municipio',
    'tipo_logradouro',
    'numero',
    'version_id',
    'laboratory_domain_id',
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
    this.dataSource.loadEmpresas('id', 'desc', 1, 10, null);
    this.empresaService.countEmpresas().subscribe((totalCount) => {
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
