import { LaboratoryStatementRuleService } from './../service/laboratory-statement-rule.service';
import { Query } from '../model/query.model';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Laboratorio } from '../model/laboratorio.model';
import { LaboratoryPostRule } from '../model/laboratory-post-rule.model';
import { LaboratoryPostRuleService } from '../service/laboratory-post-rule.service';
import { LaboratoryStatementRule} from '../model/laboratory-statement-rule.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-laboratory-post-rule',
  templateUrl: './laboratory-post-rule.component.html',
  styleUrls: ['./laboratory-post-rule.component.css']
})

export class LaboratoryPostRuleComponent implements OnInit {
  laboratoryPostRule!: LaboratoryPostRule;
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
  statements: any[] = []
  subject: Subject<any> = new Subject();

  displayedColumns = ['id', 'post', 'created_at', 'updated_at', 'laboratorio_id', 'laboratorio_statement_rule_id,', 'criado_em'];

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
    private recordService: LaboratoryPostRuleService,
  ) {
    this.currentRecord = new LaboratoryPostRule({});
    this.record ||= new LaboratoryPostRule({});
  }

  ngOnInit(): void {
    this.recordService.countLaboratoryPostRules().subscribe((totalCount) => {
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
      this.recordService.showMessage('Regra de Post criada com sucesso!');
    });

    this.currentRecord = new LaboratoryPostRule({});
    this.onFocus();
  }

  updateGridData(): void {
    this.onCreate = false;
    this.onEdit = false;
    this.recordService.update(this.currentRecord).subscribe((laboratory_post_rule) => {
      this.recordService.showMessage('Regra de Post atualizada com sucesso!');
      this.onFocus();
    });

    this.currentRecord = new LaboratoryPostRule({});
  }

  atualizar(row: LaboratoryPostRule): void {
    this.currentRecord = row;
    this.onCreate = false;
    this.onEdit = true;
    this.onFocus();
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentRecord, this.oldRecord);
    this.currentRecord = new LaboratoryPostRule({});
  }

  deleteGridData(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recordService.delete(id)
          .subscribe((record) => {
            this.recordService.showMessage('Regra de Post apagada com sucesso!');
            window.location.reload();
          });
      }
    });
  }

  searchLaboratorio(): void {
    const query_string = this.laboratoryPostRule.laboratorio_id as unknown as string;
    const query = new Query({
      key: 'nome',
      value: query_string,
      isNumeric: false,
    });
    this.query = [];
    this.query.push(query);
    this.subject.next(null);
  }

  searchStatement(): void {
    const query_string = this.laboratoryPostRule.laboratory_statement_rule_id as unknown as string;
    const query = new Query({
      key: 'name',
      value: query_string,
      isNumeric: false,
    });
    this.query = [];
    this.query.push(query);
    this.subject.next(null);
  }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadPage();
  }

  displayFn(options: Laboratorio[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.nome : '';
    };
  }

  displayFnStatement(options: LaboratoryStatementRule[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.name : '';
    };
  }

}
