import { Component, OnInit, Input } from '@angular/core';
import { Exame } from '../../../model/exame.model';
import { ExameService } from './../../../service/exame.service';
import { MatDialog } from '@angular/material/dialog';
import { Requisicao } from './../../../model/requisicao.model';
import { RequisicaoService } from './../../../service/requisicao.service';
import { Router } from '@angular/router';
import { TipoExame } from './../../../model/tipo-exame.model';
import { TipoExameService } from 'src/app/components/service/tipo-exame.service';
import { SlicePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AutoCompleteVersaoExameComponent } from '../../../auto-complete/autocomplete-versao-exame/autocomplete-versao-exame.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-requisicao-update-exames',
    templateUrl: './requisicao-update-exames.component.html',
    standalone: true,
    imports: [MatTableModule, MatSortModule, MatIconModule, AutoCompleteVersaoExameComponent, MatPaginatorModule, SlicePipe]
})
export class RequisicaoUpdateExamesComponent implements OnInit {
  @Input('requisicaoId') requisicaoId!: number;

  exame!: Exame;
  tipoExames: TipoExame[] = [];
  requisicao: Requisicao[] = [];
  dataSource: Exame[] = [];
  displayedColumns = [
    'tipo_exame',
    'situacao',
    'material_biologico',
    'nivel_urgencia',
    'nao_coletado',
    'usuario_conferencia_guia',
    'dado_auxiliar',
  ];
  totalCount!: number;

  constructor(private requisicaoService: RequisicaoService,
              public dialog: MatDialog,
              private tipoExameService: TipoExameService,
              public exameService: ExameService,
              private router: Router,) {

  }

  ngOnInit(): void {
    if (this.requisicaoId >0) {
      this.requisicaoService.searchExames(this.requisicaoId).subscribe((exames)=>{
        this.dataSource = exames;
      })
    }
  }
  addExame(): void {
    this.tipoExameService.readById(this.exame.tipo_exame!.id as number).subscribe(
      (tipoExame) =>{
      this.exame.tipo_exame = tipoExame;
      this.exame.tipo_exame_id = tipoExame.id;
        this.exameService.create(this.exame).subscribe((requisicao) => {
          this.exame.requisicao_id= requisicao.id;
          this.router.navigate(['/versao_exames']).then(() => {
            window.location.reload();
          });
        });
     });
  }
}
