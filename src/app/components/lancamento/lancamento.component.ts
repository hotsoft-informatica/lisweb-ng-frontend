import { PessoaService } from '../service/pessoa.service';
import { Pessoa } from '../model/pessoa.model';
import { Query } from '../model/query.model';
import { LancamentoService } from '../service/lancamento.service';
import {
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Lancamento } from '../model/lancamento.model';
@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
})
export class LancamentoComponent implements OnInit {
  totalCount!: number;
  dataSource: Lancamento[] = [];
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
      });
    });
  }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.load();
  }

  ngOnInit(): void {
    this.load();
  }
}
