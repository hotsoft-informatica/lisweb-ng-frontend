import { Paciente } from './../../../model/paciente.model';
import { Component, OnInit } from '@angular/core';
import { PacienteCreateDadosConvenioComponent } from './paciente-create-dados-convenio/paciente-create-dados-convenio.component';
import { PacienteCreateDadosContatosComponent } from './paciente-create-dados-contatos/paciente-create-dados-contatos.component';
import { PacienteCreateDadosEnderecoComponent } from './paciente-create-dados-endereco/paciente-create-dados-endereco.component';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
    selector: 'app-paciente-create-dados-outros',
    templateUrl: './paciente-create-dados-outros.component.html',
    standalone: true,
    imports: [MatTabsModule, PacienteCreateDadosEnderecoComponent, PacienteCreateDadosContatosComponent, PacienteCreateDadosConvenioComponent]
})
export class PacienteCreateDadosOutrosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
