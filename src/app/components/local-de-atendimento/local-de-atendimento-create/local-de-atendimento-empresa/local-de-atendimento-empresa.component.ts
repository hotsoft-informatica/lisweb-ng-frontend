import { Component, OnInit, Input } from '@angular/core';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';

@Component({
  selector: 'app-local-de-atendimento-empresa',
  templateUrl: './local-de-atendimento-empresa.component.html',
  styleUrls: ['./local-de-atendimento-empresa.component.css']
})
export class LocalDeAtendimentoEmpresaComponent implements OnInit {

  @Input('localdeatendimento') localdeatendimento: LocalDeAtendimento;


  constructor() {
    this.localdeatendimento = new LocalDeAtendimento({});
  }
  ngOnInit(): void {
  }

}
