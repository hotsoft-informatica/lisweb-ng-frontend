import { Query } from '../model/query.model';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Laboratorio } from '../model/laboratorio.model';
import { LaboratoryGetRule } from '../model/laboratory-get-rule.model';
import { LaboratoryGetRuleService } from '../service/laboratory-get-rule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';



@Component({
    selector: 'app-laboratory-get-rule',
    templateUrl: './laboratory-get-rule.component.html',
    styleUrls: ['./laboratory-get-rule.component.css'],
    standalone: true,
    imports: [MatIconModule, MatFormFieldModule, NgIf, FormsModule, MatInputModule, MatAutocompleteModule, NgFor, MatOptionModule, MatCheckboxModule, MatButtonModule, MatTableModule, MatSortModule, MatDialogModule, MatPaginatorModule]
})
export class LaboratoryGetRuleComponent implements OnInit {
  laboratoryGetRule!: LaboratoryGetRule;
  datasource = new MatTableDataSource<any>([]);
  records: any[] = [];
  record!: any;

  oldRecord: any;
  currentRecord: any;
  deletedRecords: any[] = [];
  query: Query[] = [];
  id!: number;
  totalCount!: number;
  laboratorios: any[] = []
  subject: Subject<any> = new Subject();

  displayedColumns = ['id', 'laboratorio_id', 'laboratory_get_filter_id', 'client_server_table_id', 'can_get', 'action'];

  @ViewChild('client_server_table_id') tabela!: ElementRef;
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
    private recordService: LaboratoryGetRuleService,
  ) {
    this.currentRecord = new LaboratoryGetRule({});
    this.record ||= new LaboratoryGetRule({});
  }

  ngOnInit(): void {
    this.recordService.countLaboratoryGetRules().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });
  }

  ngAfterViewInit() {
    this.loadPage();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadPage()))
      .subscribe();
  }

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

  new(): void {
    this.onCreate = true;
    this.onFocus();
  }

  onFocus(): void {
    timer(250).subscribe(() => {
      if (this.tabela !== undefined) {
        this.renderer.selectRootElement(this.tabela["nativeElement"]).focus();
      }
    });
  }

  addGridData(): void {
    console.table(this.currentRecord);
    this.onCreate = true;
    this.onEdit = false;
    this.recordService.create(this.currentRecord).subscribe((record) => {
      this.records.unshift(record);
      this.datasource.data = [...this.records];
      this.recordService.showMessage('Regra de GET criada com sucesso!');
    });

    this.currentRecord = new LaboratoryGetRule({});
    this.onFocus();
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.update(this.currentRecord).subscribe((laboratory_get_rule) => {
      this.recordService.showMessage('Regra de GET atualizada com sucesso!');
      this.onFocus();
    });

    this.currentRecord = new LaboratoryGetRule({});
  }

  atualizar(row: LaboratoryGetRule): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
    this.onFocus();
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new LaboratoryGetRule({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recordService.delete(id)
          .subscribe((record) => {
            this.recordService.showMessage('Regra de GET apagada com sucesso!');
            window.location.reload();
          });
      }
    });
  }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadPage();
  }

  searchLaboratorio(): void {
    const query_string = this.laboratoryGetRule.laboratorio_id as unknown as string;
    const query = new Query({
      key: 'nome',
      value: query_string,
      isNumeric: false,
    });
    this.query = [];
    this.query.push(query);
    this.subject.next(null);
  }

  displayFn(options: Laboratorio[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.nome : '';
    };
  }

}
