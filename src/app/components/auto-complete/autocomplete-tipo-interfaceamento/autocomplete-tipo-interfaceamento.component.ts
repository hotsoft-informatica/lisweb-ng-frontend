import { Component, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { Query } from '../../model/query.model';
import { TipoInstrumento } from 'src/app/components/model/tipo-instrumento.model';
import { TipoInstrumentoService } from './../../service/tipo-instrumento.service';
import { VersaoExame } from '../../model/versao-exame.model';

@Component({
    selector: 'app-autocomplete-tipo-interfaceamento',
    templateUrl: './autocomplete-tipo-interfaceamento.component.html',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, FormsModule, NgFor, MatOptionModule]
})
export class AutocompleteTipoInterfaceamentoComponent implements OnInit {
  @Input('versaoExame') versaoExame:VersaoExame;

  tipoInstrumentos!: TipoInstrumento[];
  versaoExames: VersaoExame[] = [];
  queries: Query[] = [];

  subject: Subject<any> = new Subject();

  constructor(
    private tipoInstrumentoService: TipoInstrumentoService,
  ) {
    this.versaoExame ||= new VersaoExame({});
    console.table(this.versaoExame);
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subject.pipe(debounceTime(500)).subscribe(() => {
      this.tipoInstrumentoService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((tipoInstrumentos: any) => {
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
