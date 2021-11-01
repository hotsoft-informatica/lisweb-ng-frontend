import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Paciente } from '../../../model/paciente.model';
import { PacienteService } from 'src/app/components/service/paciente.service';



@Component({
  selector: 'app-paciente-create-dados-pessoais',
  templateUrl: './paciente-create-dados-pessoais.component.html',
  styleUrls: ['./paciente-create-dados-pessoais.component.css']
})
export class PacienteCreateDadosPessoaisComponent implements OnInit {
  @Input('paciente') paciente: Paciente;

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
  ) {
    this.paciente = new Paciente({});
  }

  ngOnInit(): void {

  }
  public calculaIdade(): void{

    const tempo = moment(this.paciente.data_nascimento);
    const diff = moment.duration(moment().diff(tempo));
    this.paciente.idade_paciente = diff.years() + ' anos, ' + diff.months() + ' meses, ' + diff.days() + ' dias.';
    }

  createPaciente(): void {
    this.pacienteService.create(this.paciente).subscribe(() => {
       this.router.navigate(['/pacientes']);
    });
  }

}

