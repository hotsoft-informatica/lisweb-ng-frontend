import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-local-de-atendimento-urgencia',
  standalone: true,
  templateUrl: './local-de-atendimento-urgencia.component.html',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule]
})
export class LocalDeAtendimentoUrgenciaComponent implements OnInit {
  @Input('localdeatendimento') localdeatendimento: LocalDeAtendimento;

  constructor() {
    this.localdeatendimento = new LocalDeAtendimento({});
  }

  ngOnInit(): void {
  }
}
