import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { RequisicaoService } from './../../service/requisicao.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Requisicao } from './../../model/requisicao.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Paciente } from '../../model/paciente.model';
import { Convenios } from '../../model/convenios.model';
import { Medicos } from '../../model/medicos.model';

export interface DialogData{
  requisicao: Requisicao;
}
@Component({
  selector: 'app-requisicao-update',
  templateUrl: './requisicao-update.component.html',
})
export class RequisicaoUpdateComponent implements OnInit {

@Input('requisicao') requisicao: Requisicao;
@Input('paciente') paciente: Paciente;
@Input('localDeAtendimento') localDeAtendimento: LocalDeAtendimento;
@Input('medicos') medico: Medicos;
@Input('convenios') convenio: Convenios;


  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private requisicaoService: RequisicaoService,
              private dialogRef: MatDialogRef<RequisicaoUpdateComponent>,
              ) {
      this.requisicao = this.data.requisicao;
      this.requisicao ||= new Requisicao({});

      this.paciente ||= new Paciente();
      this.localDeAtendimento ||= new LocalDeAtendimento({});
      this.medico ||= new Medicos({});
      this.convenio ||= new Convenios({});
      dialogRef.disableClose = true;
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
    this.requisicaoService.searchMedico(this.requisicao.id as number).subscribe((medico)=>{
      this.medico = medico;
      })
    this.requisicaoService.searchConvenio(this.requisicao.id as number).subscribe((convenio)=>{
      this.convenio = convenio;
      })
    }

  }
