import { LancamentoService } from '../service/lancamento.service';
import { Pessoa } from '../model/pessoa.model';
import { PessoaService } from '../service/pessoa.service';
import { Query } from '../model/query.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Lancamento } from '../model/lancamento.model';
import { MatPaginator } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-lancamento',
    templateUrl: './lancamento.component.html',
    standalone: true,
    imports: [MatTableModule, MatSortModule, NgIf]
})
export class LancamentoComponent implements OnInit {
  totalCount!: number;
  dataSource: Lancamento[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  displayedColumns = [
    'descricao',
    'numero_documento',
    'tipo',
    //'quantidade_parcelas',
    'natureza',
    'valor',
    'status',
    'data_vencimento',
    'pessoa_id',
    'unidade_atendimento_id',
    'conta_contabil_id',
    'conta_id',
    'data_emissao',
  ];

  query: Query[] = [];

  constructor(
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService
  ) {}

  load(): void {
    this.lancamentoService.read(
      'id',
      'desc',
      0,
      500,
      this.query
    ).subscribe((records) => {
      this.dataSource = records;
      this.loadPessoas();
    });
  }

  loadPessoas(): void {
    this.dataSource.forEach((lancamento) => {
      this.pessoaService.readById(lancamento.pessoa_id as unknown as number)
        .subscribe((pessoa: Pessoa) => {
          lancamento.pessoa = pessoa;
      });/* TODO: 
      this.UnidadeAtendimentoService.readById(lancamento.unidade_atendimento_id as unknown as number)
        .subscribe((unidade_atendimento: UnidadeAtendimento) => {
          lancamento.unidade_atendimento = unidade_atendimento;
      });
      this.ContaContabilService.readById(lancamento.conta_contabil_id as unknown as number)
        .subscribe((conta_contabil: ContaContabil) => {
          lancamento.conta_contabil = conta_contabil;
      });
      this.ContaService.readById(lancamento.conta_id as unknown as number)
        .subscribe((conta: Conta) => {
          lancamento.conta = conta;
      });*/
    });
  }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.load();
  }

  ngOnInit(): void {
    this.load();
  }
}
