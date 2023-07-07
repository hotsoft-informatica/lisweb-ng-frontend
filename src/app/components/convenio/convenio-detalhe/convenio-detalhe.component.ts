import { Component, OnInit, Input } from '@angular/core';
import { Convenio } from '../../model/convenio.model';
import { ConvenioService } from '../../service/convenio.service';
import { Relatorio } from '../../model/relatorio.model';
import { RelatorioGuiaService } from '../../service/relatorio-guia.service';
import { Query } from 'src/app/components/model/query.model';
import { Subject, debounceTime } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-convenio-detalhe',
  standalone: true,
  templateUrl: './convenio-detalhe.component.html',
  imports: [ FormsModule, MatFormFieldModule, MatInputModule,
    MatAutocompleteModule, NgFor, MatOptionModule, MatSelectModule
  ]
})
export class ConvenioDetalheComponent implements OnInit {
  convenio: Convenio;

  @Input('relatorios') relatorios: Relatorio[] = [];

  queries: Query[] = [];

  subjectRelatorio: Subject<any> = new Subject();
  subjectMetodo: Subject<any> = new Subject();

  constructor(
    private convenioService: ConvenioService,
    private relatorioGuiaService: RelatorioGuiaService
  ) {
    this.convenio ||= new Convenio({});
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectRelatorio.pipe(debounceTime(500)).subscribe(() => {
      this.relatorioGuiaService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((relatorios: any) => {
          console.table(this.queries);
          this.relatorios = relatorios;
        });
    });
    this.subjectRelatorio.next(null);
  }

  searchRelatorio(): void {
    const query_string = this.convenio.idrelatorioguia as unknown as string;
    const query = new Query({
      key: 'titulo',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subjectRelatorio.next(null);
  }

  displayFnRelatorio(options: Relatorio[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.titulo : '';
    };
  }
}
