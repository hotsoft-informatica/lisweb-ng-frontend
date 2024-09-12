import { LocalDeAtendimentoService } from './../../../service/local-de-atendimento.service';
import { Component, OnInit, Input } from '@angular/core';
import { CepService } from 'src/app/components/service/cep.service';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { Router } from '@angular/router';
import { Cep } from '../../../model/cep.model';
import { Empresa } from 'src/app/components/model/empresa.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-local-de-atendimento-endereco',
    templateUrl: './local-de-atendimento-endereco.component.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule]
})
export class LocalDeAtendimentoEnderecoComponent implements OnInit {

  cep: Cep;
  // empresa: Empresa;

  @Input('localdeatendimento') localdeatendimento: LocalDeAtendimento;
  @Input('empresa') empresa: Empresa;

  constructor(
    private router: Router,
    private localdeatendimentoService: LocalDeAtendimentoService,
    private cepService: CepService
  ) {
    this.localdeatendimento = new LocalDeAtendimento({});
    this.empresa ||= new Empresa({});
    // this.localdeatendimento.empresa = this.empresa;
    this.cep = new Cep();
  }

  consulta(): void{
    // consulta o cep informado na variavel cep
    // Chama serviço
    this.cepService
    .consultar(this.empresa.cep as unknown as string)
    .subscribe((cep: any) => {
      // subscreve os campos
      Object.assign(this.cep, cep);
      this.empresa.cidade = this.cep.localidade;
      this.empresa.uf = this.cep.uf;
      this.empresa.endereco = this.cep.logradouro;
      this.empresa.bairro = this.cep.bairro;
    });
  }

  ngOnInit(): void {
  }

}
