import { Component, OnInit, Input } from '@angular/core';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-local-de-atendimento-horario-funcionamento',
    templateUrl: './local-de-atendimento-horario-funcionamento.component.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule]
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
