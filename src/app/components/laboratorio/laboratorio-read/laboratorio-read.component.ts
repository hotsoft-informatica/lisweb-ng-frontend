import { LaboratorioReadDataSource } from './laboratorio-read-datasource';
import { LaboratorioService } from '../../service/laboratorio.service';
import { Laboratorio } from '../../model/laboratorio.model';
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
  selector: 'app-laboratorio-read',
  templateUrl: './laboratorio-read.component.html',
  styleUrls: ['./laboratorio-read.component.css'],
})
export class LaboratorioReadComponent implements OnInit, AfterViewInit {
  totalCount!: number;
  dataSource!: LaboratorioReadDataSource;
  displayedColumns = [
    'id',
    'nome',
    'laboratory_domain_id',
    'serie',
    'criado_em',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any;

  @ViewChild('input') input: ElementRef | any;

  constructor(
    private laboratorioService: LaboratorioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.laboratorioService.read().subscribe((laboratorios) => {
    //   this.laboratorios = laboratorios;
    // });

    // this.laboratorios = this.route.snapshot.data["laboratorio"];

    this.dataSource = new LaboratorioReadDataSource(this.laboratorioService);
    this.dataSource.loadLaboratorios('id', 'desc', 1, 10, '');
    this.laboratorioService.countLaboratorios().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    // fromEvent(this.input.nativeElement, 'keyup') // Busca server-side
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;

    //       this.loadLaboratoriosPage();
    //     })
    //   )
    //   .subscribe();

    merge(this.sort.sortChange, this.paginator.page) //Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadLaboratoriosPage()))
      .subscribe();
  }

  loadLaboratoriosPage() {
    this.dataSource.loadLaboratorios(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      '' // this.input.nativeElement.value,
    );
  }
}
