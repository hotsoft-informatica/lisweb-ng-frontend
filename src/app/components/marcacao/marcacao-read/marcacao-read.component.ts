import { Query } from '../../model/query.model';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MarcacaoService } from '../../service/marcacao.service';
import { MarcacaoReadDataSource } from './marcacao-read-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import {
  tap,
} from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-marcacao-read',
  templateUrl: './marcacao-read.component.html',
  styleUrls: ['./marcacao-read.component.css']
})
export class MarcacaoReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: MarcacaoReadDataSource;

  displayedColumns = [
    'nome',
    'tipo',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;

  query: Query[] = [];

  constructor(
    private marcacaoService: MarcacaoService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadMarcacoesPage();
  }

  ngOnInit(): void {
    this.dataSource = new MarcacaoReadDataSource(this.marcacaoService);
    this.dataSource.loadMarcacoes('id', 'desc', 1, 10, null);
    this.marcacaoService.countMarcacaoes().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadMarcacoesPage()))
      .subscribe();
  }

  loadMarcacoesPage() {
    this.dataSource.loadMarcacoes(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.query
    );
  }

  deleteMarcacao(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.marcacaoService
          .delete(id)
          .subscribe(() => {
            this.router.navigate(['/marcacoes/read']).then(() => {
              window.location.reload();
            });
          });
      }
    });
  }

}
