import { Component, OnInit, Input } from '@angular/core';
import { Convenio } from '../../model/convenio.model';
import { Relatorio } from '../../model/relatorio.model';
import { TipoRelatorio } from '../../model/tipo-relatorio.model';
import { RelatorioGuiaService } from '../../service/relatorio-guia.service';
import { RelatorioFaturaService } from '../../service/relatorio-fatura.service';
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
  tipo_relatorio: TipoRelatorio;
  relatorio: Relatorio[] = [];

  @Input('relatoriosGuia') relatoriosGuia: Relatorio[] = [];
  @Input('relatoriosFatura') relatoriosFatura: Relatorio[] = [];

  queries: Query[] = [];

  subjectRelatorioGuia: Subject<any> = new Subject();
  subjectRelatorioFatura: Subject<any> = new Subject();

  constructor(
    private relatorioFaturaService: RelatorioFaturaService,
    private relatorioGuiaService: RelatorioGuiaService
  ) {
    this.convenio ||= new Convenio({});
    this.tipo_relatorio ||= new TipoRelatorio({});
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectRelatorioGuia.pipe(debounceTime(500)).subscribe(() => {
      this.relatorioGuiaService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((relatoriosGuia: any) => {
          console.table(this.queries);
          this.relatoriosGuia = relatoriosGuia;
        });
    });
    this.subjectRelatorioGuia.next(null);

    this.subjectRelatorioFatura.pipe(debounceTime(500)).subscribe(() => {
      this.relatorioFaturaService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((relatoriosFatura: any) => {
          console.table(this.queries);
          this.relatoriosFatura = relatoriosFatura;
        });
    });
    this.subjectRelatorioFatura.next(null);
  }

  searchRelatorioGuia(): void {
    const query_string = this.convenio.idrelatorioguia as unknown as string;
    const query = new Query({
      key: 'titulo',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subjectRelatorioGuia.next(null);
  }

  displayFnRelatorioGuia(options: Relatorio[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.titulo : '';
    };
  }

  searchRelatorioFatura(): void {
    const query_string = this.convenio.idrelatoriofatura as unknown as string;
    const query = new Query({
      key: 'titulo',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subjectRelatorioFatura.next(null);
  }

  displayFnRelatorioFatura(options: Relatorio[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.titulo : '';
    };
  }
}
