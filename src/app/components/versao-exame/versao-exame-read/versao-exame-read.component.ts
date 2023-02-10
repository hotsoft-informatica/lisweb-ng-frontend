import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { Query } from '../../model/query.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { VersaoExameReadDataSource } from './versao-exame-read-datasource';
import { VersaoExameService } from '../../service/versao-exame.service';
import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
@Component({
  selector: 'app-versao-exame-read',
  templateUrl: './versao-exame-read.component.html',
})
export class VersaoExameReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: VersaoExameReadDataSource;

  onEdit = false;
  onCreate = false;

  displayedColumns = ['titulo_laudo', 'descricao', 'status', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;


  query: Query[] = [];
  edit = false;

  constructor(
    private versaoExameService: VersaoExameService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadVersaoExamesPage();
  }

  ngOnInit(): void {
    this.dataSource = new VersaoExameReadDataSource(this.versaoExameService);
    this.dataSource.loadVersaoExames('id', 'desc', 1, 5, null);
    this.versaoExameService.count().subscribe((totalCount: any) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    // reseta o paginador depois de ordenar
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // Na ordenação ou paginação, carrega uma nova página
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadVersaoExamesPage()))
      .subscribe();
  }

  deleteVersaoExame(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.versaoExameService
          .delete(id)
          .subscribe(() => {
            this.router.navigate(['/versao_exames']).then(() => {
              window.location.reload();
            });
          });
      }
    });
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
