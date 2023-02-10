import { Paciente } from './../../../../model/paciente.model';
import { Component, OnInit, Input } from '@angular/core';
import { PacienteService } from 'src/app/components/service/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-create-dados-convenio',
  templateUrl: './paciente-create-dados-convenio.component.html',
})
export class PacienteCreateDadosConvenioComponent implements OnInit {

  @Input('paciente') paciente: Paciente;

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
  ) {
    this.paciente = new Paciente();
  }

  convenios: string[] = [
    'Santa Casa', 'UNIMED', 'Prever'
  ];

  ngOnInit(): void {
  }

  createPaciente(): void {
    this.pacienteService.create(this.paciente).subscribe(() => {
      this.pacienteService.showMessage('Paciente criado com sucesso!');
      this.router.navigate(['/pacientes/read']);
    });
  }

  cancel(): void {
   this.router.navigate(['/pacientes/read']);
  }

}
