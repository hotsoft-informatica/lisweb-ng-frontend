import { Query } from '../model/query.model';
import { Component, OnInit, OnChanges, AfterViewInit, ViewChild, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dominio } from '../model/dominio.model';
import { DominioService } from '../service/dominio.service';
import { DominioDataSource } from './dominio.datasource.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
@Component({
  selector: 'app-dominio',
  templateUrl: './dominio.component.html',
  styleUrls: ['./dominio.component.css']
})
export class DominioComponent implements OnInit, OnChanges, AfterViewInit {
  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;

  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;

  displayedColumns = ['descricao', 'num_ordem', 'action'];

  // @ViewChild('descricao') descricao!: ElementRef;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  onEdit = false;
  onCreate = false;

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private recordService: DominioService,
  ) {
    this.currentRecord = new Dominio({});

    // this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    // if (this.id > 0) {
    //   this.loadDominio(this.id);
    // }
    this.record ||= new Dominio({});
  }

  ngOnInit(): void {
    console.log('passou pelo ng on init');
    // this.dataSource = new DominioDataSource(this.dominioService);
    // this.dataSource.loadDominios('id', 'desc', 1, 10, null);
    this.recordService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
    // this.loadPage();
  }

  ngAfterViewInit() {
    this.loadPage();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadPage()))
      .subscribe();
  }

  // loadDominio(id: number): void {
  //   this.dominioService.readById(id).subscribe((dominio) => {
  //     this.record = dominio;
  //   });
  // }

  loadPage() {
    this.recordService
      .find(this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize, this.query
      ).subscribe((records: any[]) => {
        this.records = records;
        this.datasource.data = [...this.records];
      });
  }

  ngOnChanges(): void {
    // console.table(this.dominios);

    // this.datasource.data = this.dominios;

    // this.dominioService
    //   .readById(this.dominio.id as number)
    //   .subscribe((dominios) => {
    //     this.dominio = dominios;
    //   });
  }

  new(): void {
    this.onCreate = true;
    this.onFocus();
  }

  onFocus(): void {
    // timer(250).subscribe(() => {
    //   if (this.descricao !== undefined) {
    //     console.log("Entrou no onfocus");
    //     this.renderer.selectRootElement(this.descricao["nativeElement"]).focus();
    //   }
    // });
  }

  addGridData(): void {
    console.table(this.currentRecord);

    this.recordService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.recordService.showMessage('Domínio adicionado com sucesso!');
    });

    this.currentRecord = new Dominio({});
    // this.loadPage();
    this.onFocus();
  }

  atualizar(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.onFocus();
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new Dominio({});
  }

  updateGridData(row: Dominio): void {
    this.onCreate = false;
    this.onEdit = true;
    Object.assign(this.oldRecord, row);
    this.currentRecord = row;
    this.onFocus();
  }

  deleteGridData(position: number) {
    console.log(position);
    const dialogRef = this.dialog.open(this.deleteDialog);

    this.onCreate = false;
    this.onEdit = false;
    this.currentRecord = new Dominio({});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletedRecords.push(this.records[position]);
        this.records.splice(position, 1);
        this.loadPage();
      }
    });
  }

  // createVersaoExame(): void {
  //   if (this.id > 0) {
  //     this.updateVersaoExame();
  //   } else {
  //     this.versaoExameService.create(this.versaoExame).subscribe(() => {
  //       this.versaoExameService.showMessage('Versão de exame criada com sucesso!');
  //       this.router.navigate(['/versao_exames']).then(() => {
  //         window.location.reload();
  //       });
  //     });
  //   }
  // }



}
