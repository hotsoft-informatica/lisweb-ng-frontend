import { JsonPipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from 'src/app/components/model/empresa.model';
import { FornecedorSincronizacao } from '../../model/fornecedor-sincronizacao.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fornecedor-sincronizacao-empresa',
  templateUrl: './fornecedor-sincronizacao-empresa.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, JsonPipe]

})
export class FornecedorSincronizacaoEmpresaComponent implements OnInit {
  @Input('fornecedor') fornecedor: FornecedorSincronizacao;
  @Input('empresa') empresa: Empresa;

  constructor() {
    this.fornecedor = new FornecedorSincronizacao({});
    this.empresa ||= new Empresa({});
    this.fornecedor.empresa = this.empresa;
  }
  ngOnInit(): void {
    this.empresa ||= new Empresa({});
  }

}
