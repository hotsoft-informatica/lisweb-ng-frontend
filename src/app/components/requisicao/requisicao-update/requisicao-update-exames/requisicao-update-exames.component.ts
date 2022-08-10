import { RequisicaoService } from './../../../service/requisicao.service';
import { Exame } from '../../../model/exame.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-requisicao-update-exames',
  templateUrl: './requisicao-update-exames.component.html',
  styleUrls: ['./requisicao-update-exames.component.css']
})
export class RequisicaoUpdateExamesComponent implements OnInit {
  @Input('requisicaoId') requisicaoId!: number;

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

  constructor(private requisicaoService: RequisicaoService) { }

  ngOnInit(): void {
    this.requisicaoService.searchExames(this.requisicaoId).subscribe((exames)=>{
      this.dataSource = exames;
    })
  }

}
