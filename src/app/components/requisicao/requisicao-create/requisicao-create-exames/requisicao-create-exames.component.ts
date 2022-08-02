import { Exame } from './../../../model/exame.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requisicao-create-exames',
  templateUrl: './requisicao-create-exames.component.html',
  styleUrls: ['./requisicao-create-exames.component.css']
})
export class RequisicaoCreateExamesComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
