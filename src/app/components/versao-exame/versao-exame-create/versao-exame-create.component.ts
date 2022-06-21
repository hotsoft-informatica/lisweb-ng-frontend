import { Query } from '../../model/query.model';
import { TipoExame } from './../../model/tipo-exame.model';
import { TipoExameService } from '../../service/tipo-exame.service';
import { VersaoExame } from '../../model/versao-exame.model';
import { VersaoExameService } from '../../service/versao-exame.service';
import { Router } from '@angular/router';
import { STRING_TYPE } from '@angular/compiler';
import { pipe, map } from 'rxjs';
import {
  AfterViewInit,
  ElementRef,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  filter,
} from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-versao-exame-create',
  templateUrl: './versao-exame-create.component.html',
  styleUrls: ['./versao-exame-create.component.css']
})
export class VersaoExameCreateComponent implements OnInit {
  versaoExame: VersaoExame;
  tiposExame: TipoExame[] = [];
  queries: Query[] = [];
  subject: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private versaoExameService: VersaoExameService,
    private tipoExameService: TipoExameService
  ) {
    this.versaoExame = new VersaoExame({});
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subject.pipe(debounceTime(500)).subscribe(() => {
      this.tipoExameService
        .findTipoExames('id', 'asc', 0, 60, this.queries)
        .subscribe((tiposExame) => {
          console.table(this.queries);
          this.tiposExame = tiposExame;
        });
    });
    this.subject.next(null);
  }

  search(): void {
    const query_string = this.versaoExame
      .tipo_exame_id as unknown as string;
    const query = new Query({
      key: 'descricao',
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

  displayFn(options: TipoExame[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.descricao : '';
    };
  }
}
