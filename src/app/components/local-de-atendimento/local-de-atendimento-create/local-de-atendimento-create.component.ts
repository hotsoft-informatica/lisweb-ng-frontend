import { Component, OnInit, Input } from '@angular/core';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';

@Component({
  selector: 'app-local-de-atendimento-create',
  templateUrl: './local-de-atendimento-create.component.html',
  styleUrls: ['./local-de-atendimento-create.component.css']
})
export class LocalDeAtendimentoCreateComponent implements OnInit {

  @Input('localdeatendimento') localdeatendimento: LocalDeAtendimento;


  constructor() {
    this.localdeatendimento = new LocalDeAtendimento({});
  }

  ngOnInit(): void {
  }

}
