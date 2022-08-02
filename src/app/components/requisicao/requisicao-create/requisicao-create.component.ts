import { Requisicao } from './../../model/requisicao.model';
import { Component, OnInit, Input } from '@angular/core';
;

@Component({
  selector: 'app-requisicao-create',
  templateUrl: './requisicao-create.component.html',
  styleUrls: ['./requisicao-create.component.css']
})
export class RequisicaoCreateComponent implements OnInit {
  @Input('requisicao') requisicao: Requisicao;
  constructor() {
    this.requisicao = new Requisicao({})
   }

  ngOnInit(): void {
  }

}
