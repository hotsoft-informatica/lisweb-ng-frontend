import { PacienteService } from './../../service/paciente.service';
import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../model/paciente.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css']
})
export class PacienteCreateComponent implements OnInit {
  paciente: Paciente;
  id: number;

  constructor( // injeção de dependencia, se trata de importações proprias
    private router: Router,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
  ) {
    this.paciente = new Paciente(); // criando paciente

    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.id > 0) {
      this.load(this.id); // id > 0 carrega o paciente
    }
  }

  update(): void {
    this.pacienteService.update(this.paciente).subscribe(() => {
    });
    this.router.navigate(['/pacientes/read/']);
  }

  load(id: number): void {
    this.pacienteService
      .readById(id)

      .subscribe((paciente) => {
        this.paciente = paciente;
      });
  }

  ngOnInit(): void {
  }

  // TODO: #14 Despersonificar nome das funcoes, deixar generico o nome
  createPaciente(): void {
    console.log('Passou aqui create');
    if (this.id > 0){
      this.update();
    }
    else{
      console.table(this.paciente);
      this.pacienteService.create(this.paciente).subscribe(() => {
        this.router.navigate(['/pacientes/read']);
      });
    }
  }
  cancel(): void {
    this.router.navigate(['/pacientes/read']); // retorna /pacientes
   }
}
