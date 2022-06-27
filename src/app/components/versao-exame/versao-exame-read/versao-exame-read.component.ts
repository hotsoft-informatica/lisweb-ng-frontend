import { Query } from '../../model/query.model';
import { VersaoExameService } from '../../service/versao-exame.service';
import { VersaoExameReadDataSource } from './versao-exame-read-datasource';
import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  tap,
} from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
@Component({
  selector: 'app-versao-exame-read',
  templateUrl: './versao-exame-read.component.html',
  styleUrls: ['./versao-exame-read.component.css']
})
export class VersaoExameReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: VersaoExameReadDataSource;

  displayedColumns = [
    'titulo_laudo',
    'descricao',
    'status',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  query: Query[] = [];

  constructor(private versaoExameService: VersaoExameService) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadVersaoExamesPage();
  }

  ngOnInit(): void {
    this.dataSource = new VersaoExameReadDataSource(this.versaoExameService);
    this.dataSource.loadVersaoExames('id', 'desc', 1, 10, null);
    this.versaoExameService.countVersaoExames().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadVersaoExamesPage()))
      .subscribe();
  }

  loadVersaoExamesPage() {
    this.dataSource.loadVersaoExames(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }
}
