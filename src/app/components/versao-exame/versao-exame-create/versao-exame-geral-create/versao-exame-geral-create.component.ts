import { Query } from 'src/app/components/model/query.model';
import { VersaoExame } from './../../../model/versao-exame.model';
import { VersaoExameService } from 'src/app/components/service/versao-exame.service';
import { MetodoExame } from 'src/app/components/model/metodo-exame.model';
import { MetodoExameService } from 'src/app/components/service/metodo-exame.service';
import { Marcacao } from 'src/app/components/model/marcacao.model';
import { MarcacaoService } from 'src/app/components/service/marcacao.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  filter,
} from 'rxjs/operators';

@Component({
  selector: 'app-versao-exame-geral-create',
  templateUrl: './versao-exame-geral-create.component.html',
  styleUrls: ['./versao-exame-geral-create.component.css']
})
export class VersaoExameGeralCreateComponent implements OnInit {
  @Input('versaoExame') versaoExame: VersaoExame;
  @Input('marcacao') marcacao: Marcacao[] = [];
  @Input('metodoExame') metodoExame: MetodoExame[] = [];

  queries: Query[] = [];
  subjectMarcacao: Subject<any> = new Subject();
  subjectMetodo: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private macacaoService: MarcacaoService,
    private versaoExameService: VersaoExameService,
    private metodoExameService: MetodoExameService

  ) {
    this.versaoExame ||= new VersaoExame({});
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectMarcacao.pipe(debounceTime(500)).subscribe(() => {
      this.macacaoService
        .findMarcacoes('id', 'asc', 0, 60, this.queries)
        .subscribe((marcacao) => {
          console.table(this.queries);
          this.marcacao = marcacao;
        });
    });
    this.subjectMarcacao.next(null);

    this.subjectMetodo.pipe(debounceTime(500)).subscribe(() => {
      this.metodoExameService
        .findMetodoExames('id', 'asc', 0, 60, this.queries)
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
