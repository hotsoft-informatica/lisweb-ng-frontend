import { LocalDeAtendimentoService } from './../../../service/local-de-atendimento.service';
import { Component, OnInit, Input } from '@angular/core';
import { CepService } from 'src/app/components/service/cep.service';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { Router } from '@angular/router';
import { Cep } from '../../../model/cep.model';

@Component({
  selector: 'app-local-de-atendimento-endereco',
  templateUrl: './local-de-atendimento-endereco.component.html',
  styleUrls: ['./local-de-atendimento-endereco.component.css']
})
export class LocalDeAtendimentoEnderecoComponent implements OnInit {

  cep: Cep;

  @Input('localdeatendimento') localdeatendimento: LocalDeAtendimento;

  constructor(
    private router: Router,
    private localdeatendimentoService: LocalDeAtendimentoService,
    private cepService: CepService
  ) {
    this.localdeatendimento = new LocalDeAtendimento({});
    this.cep = new Cep();
  }

  consulta(): void{
    this.cepService // Chama serviço
    .consultar(this.localdeatendimento.cep as unknown as string) // consulta o cep informado na variavel cep
    .subscribe((cep: any) => {  // subscreve os campos
      Object.assign(this.cep, cep);
      this.localdeatendimento.cidade = this.cep.localidade;
      this.localdeatendimento.uf = this.cep.uf;
      this.localdeatendimento.endereco = this.cep.logradouro;
      this.localdeatendimento.bairro = this.cep.bairro;
    });
  }

  ngOnInit(): void {
  }

}
