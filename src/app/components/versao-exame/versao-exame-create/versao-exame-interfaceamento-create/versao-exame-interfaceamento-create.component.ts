import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Query } from '../../../model/query.model';
import { Subject } from 'rxjs';
import { TipoInstrumento } from 'src/app/components/model/tipo-instrumento.model';
import { TipoInstrumentoService } from './../../../service/tipo-instrumento.service';
import { VersaoExame } from './../../../model/versao-exame.model';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteTipoInterfaceamentoComponent } from '../../../auto-complete/autocomplete-tipo-interfaceamento/autocomplete-tipo-interfaceamento.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-versao-exame-interfaceamento-create',
  templateUrl: './versao-exame-interfaceamento-create.component.html',
  standalone: true,
  imports: [
    NgIf, MatFormFieldModule, MatInputModule, MatAutocompleteModule,
    AutocompleteTipoInterfaceamentoComponent,
    MatSlideToggleModule, FormsModule, NgFor
  ]
})

export class VersaoExameInterfaceamentoCreateComponent implements OnInit {
  @Input('versaoExame') versaoExame!: VersaoExame;
  tipoInstrumentos: TipoInstrumento[] = [];
  queries: Query[] = [];
  subjectTipoInstrumento: Subject<any> = new Subject();
  isEditInst: boolean = false;
  onEdit!: boolean;
  onCreate!: boolean;
  id: number;

  constructor(
    private tipoInstrumentoService: TipoInstrumentoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.onEdit = this.route.snapshot.paramMap.get('edit') as unknown as boolean;
    this.onCreate = this.route.snapshot.paramMap.get('create') as unknown as boolean;
    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
  }

  ngOnInit() {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectTipoInstrumento.pipe(debounceTime(500)).subscribe(() => {
      this.tipoInstrumentoService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((tipoInstrumentos) => {
          this.tipoInstrumentos = tipoInstrumentos;
        });
    });
    this.subjectTipoInstrumento.next(null);
  }

  searchTipoInstrumento(): void {
    const query_string = this.versaoExame
      .tipo_instrumento_id as unknown as string;
    const query = new Query({
      key: 'descricao',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectTipoInstrumento.next(null);
  }

  displayFnTipoInstrumento(options: TipoInstrumento[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.descricao : '';
    };
  }
}
