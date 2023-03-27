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
import { AutocompleteTipoInterfaceamentoComponent } from '../../../auto-complete/autocomplete-tipo-interfaceamento/autocomplete-tipo-interfaceamento.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-versao-exame-interfaceamento-create',
    templateUrl: './versao-exame-interfaceamento-create.component.html',
    standalone: true,
    imports: [NgIf, MatFormFieldModule, MatInputModule, AutocompleteTipoInterfaceamentoComponent, MatSlideToggleModule, FormsModule]
})
export class VersaoExameInterfaceamentoCreateComponent implements OnInit {
  @Input('versaoExame') versaoExame!: VersaoExame;

  tipoInstrumentos: TipoInstrumento[] = [];
  queries: Query[] = [];
  subject: Subject<any> = new Subject();

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

  ngOnInit(){
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subject.pipe(debounceTime(500)).subscribe(() => {
      this.tipoInstrumentoService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((tipoInstrumento: any) => {
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
