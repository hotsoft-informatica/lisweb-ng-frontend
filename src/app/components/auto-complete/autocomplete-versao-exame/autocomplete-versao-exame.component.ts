import { Component, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Query } from '../../model/query.model';
import { TipoExame } from 'src/app/components/model/tipo-exame.model';
import { TipoExameService } from '../../service/tipo-exame.service';
import { VersaoExame } from '../../model/versao-exame.model';

@Component({
  selector: 'app-autocomplete-versao-exame',
  templateUrl: './autocomplete-versao-exame.component.html',
})
export class AutoCompleteVersaoExameComponent implements OnInit{
  @Input('tipoExame') tipoExame:TipoExame | undefined;

  versaoExame!: VersaoExame;
  tipoExames: TipoExame[] = [];
  queries: Query[] = [];

  subject: Subject<any> = new Subject();

  constructor(
    private tipoExameService: TipoExameService,
  ) {
    this.tipoExame ||= new TipoExame({});
    console.table(this.tipoExame);
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subject.pipe(debounceTime(500)).subscribe(() => {
      this.tipoExameService
        .findTipoExames('id', 'asc', 0, 60, this.queries)
        .subscribe((tipoExames) => {
          this.tipoExames = tipoExames;
        });
    });
    this.subject.next(null);
  }

  search(): void {
    if (this.tipoExame){
      const query_string = this.tipoExame.id as unknown as string;
      const query = new Query({

        key: 'descricao',
        value: query_string,
        isNumeric: false,
      });
      this.queries.push(query);
      this.subject.next(null);
    }
  }

  displayFn(options: TipoExame[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.descricao : '';
    };
  }
}
