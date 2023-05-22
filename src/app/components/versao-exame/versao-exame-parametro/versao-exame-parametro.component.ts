import { Component, Input, OnChanges, ViewChild, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ParametroVersaoExame } from '../../model/parametro-versao-exame.model';
import { ParametroVersaoExameService } from '../../service/parametro-versao-exame.service';
import { Query } from 'src/app/components/model/query.model';
import { Subject, timer } from 'rxjs';
import { VersaoExame } from '../../model/versao-exame.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-versao-exame-parametro',
    templateUrl: './versao-exame-parametro.component.html',
    standalone: true,
    imports: [NgIf, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatDialogModule]
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

  displayedColumns = ['chave', 'valor', 'action'];

  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | any;
  @ViewChild(MatSort) sort: MatSort = new MatSort({});
  @ViewChild('chave') chave!: ElementRef;

  onEdit = false;
  onCreate = false;

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private parametroVersaoExameService: ParametroVersaoExameService,
  ) {
    this.currentParametroVersaoExame = new ParametroVersaoExame({});
  }

  new(): void {
    this.onCreate = true;
    this.onFocus();
  }

  onFocus(): void {
    timer(250).subscribe(() => {
      if (this.chave !== undefined) {
        console.log("Entrou no onfocus");
        this.renderer.selectRootElement(this.chave["nativeElement"]).focus();
      }
    });
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
    this.parametrosVersaoExame.unshift(this.currentParametroVersaoExame);
    this.currentParametroVersaoExame = new ParametroVersaoExame({});
    this.datasource.data = this.parametrosVersaoExame;
    this.parametroVersaoExameService.showMessage(
      'Parâmetro versão de exame adicionado com sucesso!'
    );
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
    Object.assign(this.currentParametroVersaoExame, this.oldParametroVersaoExame);
    this.currentParametroVersaoExame = new ParametroVersaoExame({});
  }

  updateParametroVersaoExame(row: ParametroVersaoExame): void {
    this.onCreate = false;
    this.onEdit = true;
    Object.assign(this.oldParametroVersaoExame, row);
    this.currentParametroVersaoExame = row;
    this.onFocus();
  }

  deleteGrid(position: number) {
    console.log(position);
    const dialogRef = this.dialog.open(this.deleteDialog);

    this.onCreate = false;
    this.onEdit = false;
    this.currentParametroVersaoExame = new ParametroVersaoExame({});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.parametrosApagados.push(this.parametrosVersaoExame[position]);
        this.parametrosVersaoExame.splice(position, 1);
        this.datasource.data = this.parametrosVersaoExame;
      }
    });
  }
}
