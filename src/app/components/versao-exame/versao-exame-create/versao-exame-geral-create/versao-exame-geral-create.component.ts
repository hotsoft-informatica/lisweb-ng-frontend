import { Component, OnInit, Input } from '@angular/core';
import { Marcacao } from 'src/app/components/model/marcacao.model';
import { MarcacaoService } from 'src/app/components/service/marcacao.service';
import { MetodoExame } from 'src/app/components/model/metodo-exame.model';
import { MetodoExameService } from 'src/app/components/service/metodo-exame.service';
import { Query } from 'src/app/components/model/query.model';
import { Subject } from 'rxjs';
import { VersaoExame } from './../../../model/versao-exame.model';
import {
  debounceTime,
} from 'rxjs/operators';

@Component({
  selector: 'app-versao-exame-geral-create',
  templateUrl: './versao-exame-geral-create.component.html',
})
export class VersaoExameGeralCreateComponent implements OnInit {
  @Input('versaoExame') versaoExame!: VersaoExame;
  @Input('marcacao') marcacao: Marcacao[] = [];
  @Input('metodoExame') metodoExame: MetodoExame[] = [];

  queries: Query[] = [];
  subjectMarcacao: Subject<any> = new Subject();
  subjectMetodo: Subject<any> = new Subject();

  constructor(
    private macacaoService: MarcacaoService,
    private metodoExameService: MetodoExameService
  ) { }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectMarcacao.pipe(debounceTime(500)).subscribe(() => {
      this.macacaoService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((marcacao: any) => {
          console.table(this.queries);
          this.marcacao = marcacao;
        });
    });
    this.subjectMarcacao.next(null);

    this.subjectMetodo.pipe(debounceTime(500)).subscribe(() => {
      this.metodoExameService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((metodoExame) => {
          console.table(this.queries);
          this.metodoExame = metodoExame;
        });
    });
    this.subjectMetodo.next(null);
  }

  searchMarcacao(): void {
    const query_string = this.versaoExame
      .marcacao_id as unknown as string;
    const query = new Query({
      key: 'nome',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subjectMarcacao.next(null);
  }

  searchMetodo(): void {
    const query_string = this.versaoExame
      .metodo_exame_id as unknown as string;
    const query = new Query({
      key: 'descricao',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subjectMetodo.next(null);
  }

  displayFnMarcacao(options: Marcacao[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.nome : '';
    };
  }

  displayFnMetodo(options: MetodoExame[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.descricao : '';
    };
  }
}
