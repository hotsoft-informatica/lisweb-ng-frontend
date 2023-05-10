import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { RequisicaoService } from './../../service/requisicao.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Requisicao } from './../../model/requisicao.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Paciente } from '../../model/paciente.model';
import { Convenios } from '../../model/convenios.model';
import { Medico } from '../../model/medico.model';
import { DatePipe } from '@angular/common';
import { RequisicaoUpdateExamesComponent } from './requisicao-update-exames/requisicao-update-exames.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

export interface DialogData {
  requisicao: Requisicao;
}
@Component({
  selector: 'app-requisicao-update',
  templateUrl: './requisicao-update.component.html',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule, RequisicaoUpdateExamesComponent, MatDialogModule, DatePipe]
})
export class RequisicaoUpdateComponent implements OnInit {

  @Input('requisicao') requisicao: Requisicao;
  @Input('paciente') paciente: Paciente;
  @Input('localDeAtendimento') localDeAtendimento: LocalDeAtendimento;
  @Input('medicos') medico: Medico;
  @Input('convenios') convenio: Convenios;


  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private requisicaoService: RequisicaoService,
    private dialogRef: MatDialogRef<RequisicaoUpdateComponent>,
  ) {
    this.requisicao = this.data.requisicao;
    this.requisicao ||= new Requisicao({});

    this.paciente ||= new Paciente();
    this.localDeAtendimento ||= new LocalDeAtendimento({});
    this.medico ||= new Medico({});
    this.convenio ||= new Convenios({});
    dialogRef.disableClose = true;
  }

  updateRequisicao(): void {
    this.requisicaoService.create(this.requisicao).subscribe(() => {

    });
  }

  ngOnInit(): void {
    this.requisicaoService.searchPaciente(this.requisicao.id as number).subscribe((paciente) => {
      this.paciente = paciente;
    })
    this.requisicaoService.searchLocalDeAtendimento(this.requisicao.id as number).subscribe((localDeAtendimento) => {
      this.localDeAtendimento = localDeAtendimento;
    })
    this.requisicaoService.searchMedico(this.requisicao.id as number).subscribe((medico) => {
      this.medico = medico;
    })
    this.requisicaoService.searchConvenio(this.requisicao.id as number).subscribe((convenio) => {
      this.convenio = convenio;
    })
  }

}
