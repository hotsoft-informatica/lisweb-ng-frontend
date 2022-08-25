import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { Query } from 'src/app/components/model/query.model';
import { VersaoExame } from '../../model/versao-exame.model';
import { VersaoExameService } from 'src/app/components/service/versao-exame.service';
import { ParametroVersaoExame } from '../../model/parametro-versao-exame.model';
import { ParametroVersaoExameService } from '../../service/parametro-versao-exame.service';
import { Component, Input, OnChanges, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-versao-exame-parametro',
  templateUrl: './versao-exame-parametro.component.html',
  styleUrls: ['./versao-exame-parametro.component.css']
})
export class VersaoExameParametroComponent implements OnChanges {
  @Input('versaoExame') versaoExame!: VersaoExame;
  @Input('parametrosVersaoExame') parametrosVersaoExame: ParametroVersaoExame[] = [];

  datasource = new MatTableDataSource<any>([]);
  totalCount!: number;
  oldParametroVersaoExame: ParametroVersaoExame = new ParametroVersaoExame({});
  currentParametroVersaoExame: ParametroVersaoExame = new ParametroVersaoExame({});
  subjectParametroVersaoExame: Subject<any> = new Subject();
  queries: Query[] = [];
  parametrosApagados: ParametroVersaoExame[] = [];

  displayedColumns = ['id', 'chave', 'valor', 'action'];

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort = new MatSort({});

  onEdit = false;
  onCreate = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private versaoExameService: VersaoExameService,
    private parametroVersaoExameService: ParametroVersaoExameService,
  ) {
    this.currentParametroVersaoExame = new ParametroVersaoExame({});
  }

  ngOnChanges(): void {
    this.datasource.data = this.parametrosVersaoExame;
    this.datasource.sort = this.sort;

    const sortState: Sort = { active: 'id', direction: 'desc' }
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction
    this.sort.sortChange.emit(sortState);

    if (this.versaoExame?.id && this.parametrosVersaoExame.length == 0) {
      this.parametroVersaoExameService
        .getByVersaoExameId(this.versaoExame.id as number)
        .subscribe((parametrosVersaoExame) => {
          this.parametrosVersaoExame = parametrosVersaoExame;
        });
    }
  }

  addParametroVersaoExame(): void {
    this.parametrosVersaoExame.push(this.currentParametroVersaoExame);
    this.currentParametroVersaoExame = new ParametroVersaoExame({});
    this.datasource.data = this.parametrosVersaoExame;
    this.parametroVersaoExameService.showMessage('Parâmetro versão de exame adicionado com sucesso!');
  }

  atualizar(): void {
    this.onCreate = false;
    this.onEdit = false;
  }

  cancelar(): void {
    this.onCreate = false;
    this.onEdit = false;
    Object.assign(this.currentParametroVersaoExame, this.oldParametroVersaoExame);
    this.currentParametroVersaoExame = new ParametroVersaoExame({});
  }

  updateParametroVersaoExame(row: ParametroVersaoExame): void {
    this.onCreate = false;
    this.onEdit = true;
    Object.assign(this.oldParametroVersaoExame, row);
    this.currentParametroVersaoExame = row;
  }

  deleteGrid(position: number) {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.parametrosApagados.push(this.parametrosVersaoExame[position]);
        this.parametrosVersaoExame.splice(position, 1);
        this.datasource.data = this.parametrosVersaoExame;
      }
    });
  }
}
