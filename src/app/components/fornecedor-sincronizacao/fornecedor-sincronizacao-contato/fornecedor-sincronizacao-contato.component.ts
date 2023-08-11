import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empresa } from 'src/app/components/model/empresa.model';
import { FornecedorSincronizacao } from '../../model/fornecedor-sincronizacao.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fornecedor-sincronizacao-contato',
  templateUrl: './fornecedor-sincronizacao-contato.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule]
})
export class FornecedorSincronizacaoContatoComponent implements OnInit {
  @Input('fornecedorSincronizacao') fornecedorSincronizacao: FornecedorSincronizacao;
  @Input('empresa') empresa: Empresa;

  constructor() {
    this.fornecedorSincronizacao = new FornecedorSincronizacao({});
    this.empresa ||= new Empresa({});
    // console.table(this.empresa);
    this.fornecedorSincronizacao.empresa = this.empresa;
  }
  ngOnInit(): void {
    this.empresa ||= new Empresa({});
  }

}
