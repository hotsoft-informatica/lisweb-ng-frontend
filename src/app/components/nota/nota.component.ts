import { Query } from '../model/query.model';
import { NotaService } from 'src/app/components/service/nota.service';
import {
  Component,
  OnInit,
} from '@angular/core';
@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html'
})
export class NotaComponent implements OnInit {
  totalCount!: number;
  dataSource: any[] = [];
  displayedColumns = [
    "numero",
    "nome",
    "descricao",
    "created_at",
    "enviado_em",
    "valor",
    "status", /*
    "desconto",
    "consultado_em",
    "cancelamento_em",
    "aceito_em",
    "rejeitado_em",
    "cancelado_em",
    "cpf",
    "cnpj",
    "inscricao_estadual",
    "razao_social",
    "logradouro",
    "tipo_logradouro",
    "numero_endereco",
    "complemento",
    "bairro",
    "cod_ibge_municipio",
    "uf",
    "cep",
    "url_download_pdf",
    "justificativa_rejeicao",
    "laboratorio_id",
    "pessoa_id",
    "updated_at",
    "municipio",
    "telefone",
    "natureza_operacao",
    "optante_simples_nacional",
    "incentivador_cultural",
    "item_lista_servico"*/
  ];

  query: Query[] = [];

  constructor(
    private notaService: NotaService,
  ) {}

  load(): void {
    this.notaService.read(
      'id',
      'desc',
      1,
      500,
      this.query
    ).subscribe((records: any) => {
      this.dataSource = records;
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
