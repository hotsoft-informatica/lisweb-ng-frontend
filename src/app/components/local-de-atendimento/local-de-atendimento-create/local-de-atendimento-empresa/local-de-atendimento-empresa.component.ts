import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from 'src/app/components/model/empresa.model';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-local-de-atendimento-empresa',
    templateUrl: './local-de-atendimento-empresa.component.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule]
})
export class LocalDeAtendimentoEmpresaComponent implements OnInit {
  @Input('localdeatendimento') localdeatendimento: LocalDeAtendimento;
  @Input('empresa') empresa: Empresa;

  constructor() {
    this.localdeatendimento = new LocalDeAtendimento({});
    this.empresa ||= new Empresa({});
    // console.table(this.empresa);
    this.localdeatendimento.empresa = this.empresa;
  }
  ngOnInit(): void {
    this.empresa ||= new Empresa({});
  }

}
