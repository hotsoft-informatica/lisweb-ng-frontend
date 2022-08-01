import { VersaoExameService } from 'src/app/components/service/versao-exame.service';
import { TipoInstrumento } from 'src/app/components/model/tipo-instrumento.model';
import { TipoInstrumentoService } from './../../service/tipo-instrumento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Query } from '../../model/query.model';
import { VersaoExame } from '../../model/versao-exame.model';


@Component({
  selector: 'app-autocomplete-tipo-interfaceamento',
  templateUrl: './autocomplete-tipo-interfaceamento.component.html',
  styleUrls: ['./autocomplete-tipo-interfaceamento.component.css']
})
export class AutocompleteTipoInterfaceamentoComponent implements OnInit {
  @Input('versaoExame') versaoExame:VersaoExame;

  tipoInstrumentos!: TipoInstrumento[];
  versaoExames: VersaoExame[] = [];
  queries: Query[] = [];

  subject: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tipoInstrumentoService: TipoInstrumentoService,
    private versaoExameService: VersaoExameService
  ) {
    this.versaoExame ||= new VersaoExame({});
    console.table(this.versaoExame);
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subject.pipe(debounceTime(500)).subscribe(() => {
      this.tipoInstrumentoService
        .findTipoInstrumentos('id', 'asc', 0, 60, this.queries)
        .subscribe((tipoInstrumentos) => {
          this.tipoInstrumentos = tipoInstrumentos;
        });
    });
    this.subject.next(null);
  }

  search(): void {
    const query_string = this.versaoExame.id as unknown as string;
    const query = new Query({

      key: 'descricao',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subject.next(null);
  }

  displayFn(options: TipoInstrumento[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.descricao : '';
    };
  }

}
