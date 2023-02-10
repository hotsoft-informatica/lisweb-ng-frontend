import { Paciente } from './../../../../model/paciente.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/components/service/paciente.service';

@Component({
  selector: 'app-paciente-create-dados-contatos',
  templateUrl: './paciente-create-dados-contatos.component.html',
})
export class PacienteCreateDadosContatosComponent implements OnInit {
  @Input('paciente') paciente: Paciente;

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
  ) {
    this.paciente = new Paciente();
  }

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
