import { Query } from '../../model/query.model'
import { AtributoExame } from '../../model/atributo-exame.model'
import { AtributoExameService } from '../../service/atributo-exame.service'
import { VersaoExame } from '../../model/versao-exame.model';
import { VersaoExameService } from '../../service/versao-exame.service';
import { ValorReferencia } from '../../model/valor-referencia.model';
import { ValorReferenciaService } from '../../service/valor-referencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-valor-referencia-create',
  templateUrl: './valor-referencia-create.component.html',
  styleUrls: ['./valor-referencia-create.component.css']
})
export class ValorReferenciaCreateComponent implements OnInit {
  valorReferencia!: ValorReferencia;

  @Input('versaoExame') versaoExame: VersaoExame[] = [];
  @Input('atributoExame') atributoExame: AtributoExame[] = [];

  queries: Query[] = [];
  subjectVersaoExame: Subject<any> = new Subject();
  subjectAtributoExame: Subject<any> = new Subject();

  id: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private versaoExameService: VersaoExameService,
    private atributoExameService: AtributoExameService,
    private valorReferenciaService: ValorReferenciaService,

  ) { }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectVersaoExame.pipe(debounceTime(500)).subscribe(() => {
      this.versaoExameService
        .findVersaoExames('id', 'asc', 0, 60, this.queries)
        .subscribe((versaoExame) => {
          console.table(this.queries);
          this.versaoExame = versaoExame;
        });
    });
    this.subjectVersaoExame.next(null);

    this.subjectAtributoExame.pipe(debounceTime(500)).subscribe(() => {
      this.atributoExameService
        .findAtributoExame('id', 'asc', 0, 60, this.queries)
        .subscribe((atributoExame) => {
          console.table(this.queries);
          this.atributoExame = atributoExame;
        });
    });
    this.subjectAtributoExame.next(null);
  }

  updateValorReferencia(): void {
    this.valorReferenciaService.update(this.valorReferencia).subscribe((valorReferencia) => {
      this.valorReferencia = valorReferencia;
    });
    this.router.navigate(['/valores_referencia']).then(() => {
      window.location.reload();
    });
  }

  searchVersaoExame(): void {
    const query_string = this.valorReferencia
      .versao_exame_id as unknown as string;
    const query = new Query({
      key: 'descricao',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subjectVersaoExame.next(null);
  }

  searchAtributoExame(): void {
    const query_string = this.valorReferencia
      .atributo_exame_id as unknown as string;
    const query = new Query({
      key: 'rotulo',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subjectAtributoExame.next(null);
  }

  displayFnVersaoExame(options: VersaoExame[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.descricao : '';
    };
  }

  displayFnAtributoExame(options: AtributoExame[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.rotulo : '';
    };
  }

  createValorReferencia(): void {
    if (this.id > 0) {
      this.updateValorReferencia();
    } else {
      this.valorReferenciaService.create(this.valorReferencia).subscribe(() => {
        this.valorReferenciaService.showMessage('Valor de referência criado com sucesso!');
        this.router.navigate(['/valores_referencia']).then(() => {
          window.location.reload();
        });
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/valores_referencia']);
  }

}
