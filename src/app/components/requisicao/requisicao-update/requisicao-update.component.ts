import { RequisicaoService } from './../../service/requisicao.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Requisicao } from './../../model/requisicao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from '../../model/paciente.model';

export interface DialogData{
  requisicao: Requisicao;
}
@Component({
  selector: 'app-requisicao-update',
  templateUrl: './requisicao-update.component.html',
  styleUrls: ['./requisicao-update.component.css']
})
export class RequisicaoUpdateComponent implements OnInit {

@Input('requisicao') requisicao: Requisicao;
@Input('paciente') paciente: Paciente;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private requisicaoService: RequisicaoService,
              ) {
      this.requisicao = this.data.requisicao;
      this.requisicao ||= new Requisicao({})

      this.paciente ||= new Paciente({})
  }

  updateRequisicao(): void {
    this.requisicaoService.create(this.requisicao).subscribe(() => {

    });
  }

  ngOnInit(): void {
  }

}
