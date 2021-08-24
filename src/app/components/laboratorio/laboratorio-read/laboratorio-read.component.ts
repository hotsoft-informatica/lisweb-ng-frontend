import { LaboratorioReadDataSource } from './laboratorio-read-datasource';
import { LaboratorioService } from '../../service/laboratorio.service';
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

  constructor(private laboratorioService: LaboratorioService) { }

  ngOnInit(): void {
    this.dataSource = new LaboratorioReadDataSource(this.laboratorioService);
    this.dataSource.loadLaboratorios('id', 'desc', 1, 10, '');
    this.laboratorioService.countLaboratorios().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    fromEvent<any>(this.input.nativeElement, 'keyup') // Busca server-side
      .pipe(
        debounceTime(150),
        filter((e: KeyboardEvent) => e.keyCode === 13),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLaboratoriosPage();
        })
      )
      .subscribe();

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
      this.input.nativeElement.value
    );
  }
}
