import { Query } from 'src/app/components/model/query.model';
import { VersaoExame } from '../../model/versao-exame.model';
import { VersaoExameService } from 'src/app/components/service/versao-exame.service';
import { ParametroVersaoExame } from '../../model/parametro-versao-exame.model';
import { ParametroVersaoExameService } from '../../service/parametro-versao-exame.service';
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
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

  displayedColumns = ['chave', 'valor', 'action'];

  constructor(
    private router: Router,
    private versaoExameService: VersaoExameService,
    private parametroVersaoExameService: ParametroVersaoExameService,
  ) { }

  ngOnChanges(): void {
    this.datasource.data = this.parametrosVersaoExame;
    console.warn(this.versaoExame?.id);
    if (this.versaoExame?.id && this.parametrosVersaoExame.length == 0) {
      this.parametroVersaoExameService
        .getByVersaoExameId(this.versaoExame.id as number)
        .subscribe((parametrosVersaoExame) => {
          console.table(this.parametrosVersaoExame);
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

  cancelar(): void {
    Object.assign(this.currentParametroVersaoExame, this.oldParametroVersaoExame);
    this.currentParametroVersaoExame = new ParametroVersaoExame({});
  }

  updateParametroVersaoExame(row: ParametroVersaoExame): void {
    Object.assign(this.oldParametroVersaoExame, row);
    this.currentParametroVersaoExame = row;
  }

  deleteGrid(position: number) {
    console.table(this.datasource.data);

    this.parametrosVersaoExame.splice(position, 1);
    this.datasource.data = this.parametrosVersaoExame;
  }
}
