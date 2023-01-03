import { Query } from '../../model/query.model'
import { AtributoExame } from '../../model/atributo-exame.model'
import { AtributoExameService } from '../../service/atributo-exame.service';
import { VersaoExame } from '../../model/versao-exame.model';
import { VersaoExameService } from '../../service/versao-exame.service';
import { ValorReferencia } from '../../model/valor-referencia.model';
import { ValorReferenciaService } from '../../service/valor-referencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-valor-referencia-create',
  templateUrl: './valor-referencia-create.component.html',
})
export class ValorReferenciaCreateComponent implements OnInit {
  valorReferencia!: ValorReferencia;
  id: number;

  versoesExame: VersaoExame[] = [];
  atributosExame: AtributoExame[] = [];
  queries: Query[] = [];

  subjectVersaoExame: Subject<any> = new Subject();
  subjectAtributoExame: Subject<any> = new Subject();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private versaoExameService: VersaoExameService,
    private atributoExameService: AtributoExameService,
    private valorReferenciaService: ValorReferenciaService,

  ) {
    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.id > 0) {
      this.loadValorReferencia(this.id);
    }
    this.valorReferencia ||= new ValorReferencia({});
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectVersaoExame.pipe(debounceTime(500)).subscribe(() => {
      this.versaoExameService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((versaoExame) => {
          console.table(this.queries);
          this.versoesExame = versaoExame;
        });
    });
    this.subjectVersaoExame.next(null);

    this.subjectAtributoExame.pipe(debounceTime(500)).subscribe(() => {
      this.atributoExameService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((atributoExame: any) => {
          console.table(this.queries);
          this.atributosExame = atributoExame;
        });
    });
    this.subjectAtributoExame.next(null);
  }

  loadValorReferencia(id: number): void {
    this.valorReferenciaService.readById(id).subscribe((valorReferencia) => {
      this.valorReferencia = valorReferencia;

      this.versaoExameService
        .readById(this.valorReferencia?.versao_exame_id as number)
        .subscribe((versaoExame) => {
          this.valorReferencia.versaoExame = versaoExame;
          this.versoesExame.push(versaoExame);
        });
      this.atributoExameService
        .readById(this.valorReferencia?.atributo_exame_id as number)
        .subscribe((atributoExame) => {
          this.valorReferencia.atributoExame = atributoExame;
          this.atributosExame.push(atributoExame);
        });
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

  updateValorReferencia(): void {
    this.valorReferenciaService.update(this.valorReferencia).subscribe((valorReferencia) => {
      this.valorReferencia = valorReferencia;
    });
    this.router.navigate(['/valores_referencia/read']).then(() => {
      window.location.reload();
    });
  }

  createValorReferencia(): void {
    if (this.id > 0) {
      this.updateValorReferencia();
    } else {
      this.valorReferenciaService.create(this.valorReferencia).subscribe(() => {
        this.valorReferenciaService.showMessage('Valor de referência criado com sucesso!');
        this.router.navigate(['valores_referencia/read']).then(() => {
          window.location.reload();
        });
      });
    }
  }

  cancel(): void {
    this.router.navigate(['valores_referencia/read']);
  }

}
