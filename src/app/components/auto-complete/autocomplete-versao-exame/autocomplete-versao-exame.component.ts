import { TipoExameService } from '../../service/tipo-exame.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VersaoExameService } from '../../service/versao-exame.service';
import { Component, OnInit, Input } from '@angular/core';
import { Query } from '../../model/query.model';
import { TipoExame } from 'src/app/components/model/tipo-exame.model';
import { VersaoExame } from '../../model/versao-exame.model';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-autocomplete-versao-exame',
  templateUrl: './autocomplete-versao-exame.component.html',
  styleUrls: ['./autocomplete-versao-exame.component.css']
})
export class AutoCompleteVersaoExameComponent implements OnInit{
  @Input('tipoExame') tipoExame:TipoExame;

  versaoExame!: VersaoExame;
  tipoExames: TipoExame[] = [];
  queries: Query[] = [];

  subject: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private versaoExameService: VersaoExameService,
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
    const query_string = this.tipoExame.id as unknown as string;
    const query = new Query({

      key: 'descricao',
      value: query_string,
      isNumeric: false,
    });
    this.queries.push(query);
    this.subject.next(null);
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
