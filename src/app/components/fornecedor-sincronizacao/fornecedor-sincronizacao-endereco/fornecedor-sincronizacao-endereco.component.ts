import { JsonPipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from 'src/app/components/model/empresa.model';
import { FornecedorSincronizacao } from '../../model/fornecedor-sincronizacao.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Cep } from '../../model/cep.model';
import { CepService } from '../../service/cep.service';

@Component({
  selector: 'app-fornecedor-sincronizacao-endereco',
  templateUrl: './fornecedor-sincronizacao-endereco.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, JsonPipe]
})
export class FornecedorSincronizacaoEnderecoComponent implements OnInit {
  @Input('fornecedor') fornecedor: FornecedorSincronizacao;
  @Input('empresa') empresa: Empresa;
  cep: Cep;

  constructor(
    private cepService: CepService
  ) {
    this.fornecedor = new FornecedorSincronizacao({});
    this.empresa ||= new Empresa({});
    this.fornecedor.empresa = this.empresa;
    this.cep = new Cep();
  }

  ngOnInit(): void {
    this.empresa ||= new Empresa({});
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

}
