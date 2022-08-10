import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { RequisicaoService } from './../../service/requisicao.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Requisicao } from './../../model/requisicao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from '../../model/paciente.model';
import { Convenios } from '../../model/convenios.model';
import { Medicos } from '../../model/medicos.model';

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
@Input('localDeAtendimento') localDeAtendimento: LocalDeAtendimento;
@Input('medicos') medicos: Medicos;
@Input('convenios') convenios: Convenios;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private requisicaoService: RequisicaoService,
              ) {
      this.requisicao = this.data.requisicao;
      this.requisicao ||= new Requisicao({});

      this.paciente ||= new Paciente({});
      this.localDeAtendimento ||= new LocalDeAtendimento({});
      this.medicos ||= new Medicos({});
      this.convenios ||= new Convenios({});
    }

  updateRequisicao(): void {
    this.requisicaoService.create(this.requisicao).subscribe(() => {

    });
  }

  ngOnInit(): void {
    this.requisicaoService.searchPaciente(this.requisicao.id as number).subscribe((paciente)=>{
      this.paciente = paciente;
      })
    this.requisicaoService.searchLocalDeAtendimento(this.requisicao.id as number).subscribe((localDeAtendimento)=>{
      this.localDeAtendimento = localDeAtendimento;
      })
    this.requisicaoService.searchMedico(this.requisicao.id as number).subscribe((medicos)=>{
      this.medicos = medicos;
      })
    this.requisicaoService.searchConvenio(this.requisicao.id as number).subscribe((convenios)=>{
      this.convenios = convenios;
      })
    }
  }
