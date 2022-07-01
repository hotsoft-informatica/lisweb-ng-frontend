import { TipoInstrumentoService } from './../../../service/tipo-instrumento.service';
import { VersaoExameService } from 'src/app/components/service/versao-exame.service';
import { VersaoExame } from './../../../model/versao-exame.model';
import { Query } from '../../../model/query.model';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  debounceTime,
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TipoInstrumento } from 'src/app/components/model/tipo-instrumento.model';

@Component({
  selector: 'app-versao-exame-interfaceamento-create',
  templateUrl: './versao-exame-interfaceamento-create.component.html',
  styleUrls: ['./versao-exame-interfaceamento-create.component.css']
})
export class VersaoExameInterfaceamentoCreateComponent implements OnInit {
  @Input('versaoExame') versaoExame!: VersaoExame;

  tipoInstrumentos: TipoInstrumento[] = [];
  queries: Query[] = [];
  subject: Subject<any> = new Subject();


  constructor(
    private tipoInstrumentoService: TipoInstrumentoService,
  ) { }

  ngOnInit(){
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subject.pipe(debounceTime(500)).subscribe(() => {
      this.tipoInstrumentoService
        .findTipoInstrumentos('id', 'asc', 0, 60, this.queries)
        .subscribe((tipoInstrumento) => {
          this.tipoInstrumentos = tipoInstrumento;
        });
    });
    this.subject.next(null);
  }

  search(): void {
    const query_string = this.versaoExame
      .tipo_instrumento_id as unknown as string;
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
