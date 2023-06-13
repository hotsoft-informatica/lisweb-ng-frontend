import { Component, OnChanges, Input } from '@angular/core';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-local-de-atendimento-horario-funcionamento',
    templateUrl: './local-de-atendimento-horario-funcionamento.component.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule]
})
export class LocalDeAtendimentoHorarioFuncionamentoComponent implements OnChanges {
  @Input('localdeatendimento') localdeatendimento: LocalDeAtendimento;
  trabalha_24_horas = false;

  constructor() {
    this.localdeatendimento ||= new LocalDeAtendimento({});
  }

  ngOnChanges(): void {
    if (this.localdeatendimento) {
      this.trabalha_24_horas = this.localdeatendimento.trabalha_24_horas != 'S' ? false : true;
    }
  }

  toggleChanges(e: MatSlideToggleChange){
    this.trabalha_24_horas = e.source.checked
    this.localdeatendimento.trabalha_24_horas = this.trabalha_24_horas ? 'S' : 'N';
  }
}
