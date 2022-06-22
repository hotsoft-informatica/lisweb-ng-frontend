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
  @Input('metodoExame') metodoExame: MetodoExame[] = [];
  @Input('marcacao') marcacao: Marcacao[] = [];

  queries: Query[] = [];
  subject: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private versaoExameService: VersaoExameService,
    private macacaoService: MarcacaoService

  ) {
    this.versaoExame = new VersaoExame({});
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subject.pipe(debounceTime(500)).subscribe(() => {
      this.macacaoService
        .findMarcacoes('id', 'asc', 0, 60, this.queries)
        .subscribe((marcacao) => {
          console.table(this.queries);
          this.marcacao = marcacao;
        });
    });
    this.subject.next(null);
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
    this.subject.next(null);
  }

  createVersaoExame(): void {
    this.versaoExameService.create(this.versaoExame).subscribe(() => {
      this.versaoExameService.showMessage('Versão de exame criada com sucesso!');
      this.router.navigate(['/versao_exames']).then(() => {
        window.location.reload();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/versao_exames']);
  }

  displayFnMarcacao(options: Marcacao[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.nome : '';
    };
  }
}
