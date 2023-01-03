import { PacienteService } from 'src/app/components/service/paciente.service';
import { Component, OnInit, Input } from '@angular/core';
import { CepService } from 'src/app/components/service/cep.service';
import { Paciente } from 'src/app/components/model/paciente.model';
import { Router } from '@angular/router';
import { Cep } from '../../../../model/cep.model';


@Component({
  selector: 'app-paciente-create-dados-endereco',
  templateUrl: './paciente-create-dados-endereco.component.html',
})
export class PacienteCreateDadosEnderecoComponent implements OnInit {

  cep: Cep;

  @Input('paciente') paciente: Paciente;

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
    private cepService: CepService
  ) {
    this.paciente = new Paciente();
    this.cep = new Cep();
  }

  ngOnInit(): void {
  }

  consulta(): void{
    // consulta o cep informado na variavel cep
    this.cepService // Chama serviço
    .consultar(this.paciente.cep as unknown as string)
    .subscribe((cep: any) => {
      // subscreve os campos
      Object.assign(this.cep, cep);
      this.paciente.cidade = this.cep.localidade;
      this.paciente.uf = this.cep.uf;
      this.paciente.cod_ibge_municipio = this.cep.ibge;
      this.paciente.endereco = this.cep.logradouro;
      this.paciente.bairro = this.cep.bairro;
    });
  }
  createPaciente(): void {
    this.pacienteService.create(this.paciente).subscribe(() => {
      this.pacienteService.showMessage('Paciente criado com sucesso!');
      this.router.navigate(['/pacientes/read']);
    });
  }

  cancel(): void {
   this.router.navigate(['/pacientes']);
  }
}
