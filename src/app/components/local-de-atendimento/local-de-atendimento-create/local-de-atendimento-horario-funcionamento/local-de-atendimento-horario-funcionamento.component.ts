import { Component, OnInit, Input } from '@angular/core';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';

@Component({
  selector: 'app-local-de-atendimento-horario-funcionamento',
  templateUrl: './local-de-atendimento-horario-funcionamento.component.html',
  styleUrls: ['./local-de-atendimento-horario-funcionamento.component.css']
})
export class LocalDeAtendimentoHorarioFuncionamentoComponent implements OnInit {
  integral = false;

  @Input('localdeatendimento') localdeatendimento: LocalDeAtendimento;


  constructor() {
    this.localdeatendimento = new LocalDeAtendimento({});
  }

  ngOnInit(): void {
  }

}
