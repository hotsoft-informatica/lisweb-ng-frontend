import { Query } from '../../model/query.model';
import { ParametroVersaoExame } from '../../model/parametro-versao-exame.model';
import { ParametroVersaoExameService } from '../../service/parametro-versao-exame.service';
import { TipoExame } from 'src/app/components/model/tipo-exame.model';
import { TipoExameService } from '../../service/tipo-exame.service';
import { VersaoExame } from '../../model/versao-exame.model';
import { VersaoExameService } from '../../service/versao-exame.service';

import { MetodoExame } from 'src/app/components/model/metodo-exame.model';
import { MetodoExameService } from 'src/app/components/service/metodo-exame.service';
import { Marcacao } from 'src/app/components/model/marcacao.model';
import { MarcacaoService } from 'src/app/components/service/marcacao.service';

import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  debounceTime,
} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-versao-exame-create',
  templateUrl: './versao-exame-create.component.html',
  styleUrls: ['./versao-exame-create.component.css']
})
export class VersaoExameCreateComponent implements OnInit {
  versaoExame!: VersaoExame;
  parametrosVersaoExame: ParametroVersaoExame[] = [];
  tipoExames: TipoExame[] = [];
  metodoExames: MetodoExame[] = [];
  marcacoes: Marcacao[] = [];
  queries: Query[] = [];

  subject: Subject<any> = new Subject();
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private versaoExameService: VersaoExameService,
    private tipoExameService: TipoExameService,
    private marcacaoService: MarcacaoService,
    private metodoExameService: MetodoExameService,
    private parametroVersaoExameService: ParametroVersaoExameService

  ) {
    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.id > 0) {
      this.loadVersaoExame(this.id);
    }
    this.versaoExame ||= new VersaoExame({});
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

  updateVersaoExame(): void {
    this.versaoExameService.update(this.versaoExame).subscribe((versaoExame) => {
      this.versaoExame = versaoExame;
    });
    this.router.navigate(['/versao_exames']).then(() => {
      window.location.reload();
    });
  }

  loadVersaoExame(id: number): void {
    this.versaoExameService.readById(id).subscribe((versaoExame) => {
      this.versaoExame = versaoExame;
      console.warn(this.versaoExame.tipo_exame_id);

      this.parametroVersaoExameService
        .getByVersaoExameId(this.versaoExame?.id as number)
        .subscribe((parametrosVersaoExame) => {
          this.versaoExame.parametrosVersaoExame = parametrosVersaoExame;
          this.parametrosVersaoExame = parametrosVersaoExame;
        });
      this.tipoExameService
        .readById(this.versaoExame?.tipo_exame_id as number)
        .subscribe((tipoExame) => {
          this.versaoExame.tipoExame = tipoExame;
          this.tipoExames.push(tipoExame);
        });
      this.marcacaoService
        .readById(this.versaoExame?.marcacao_id as number)
        .subscribe((marcacao) => {
          this.versaoExame.marcacao = marcacao;
          this.marcacoes.push(marcacao);
        });
      this.metodoExameService
        .readById(this.versaoExame?.metodo_exame_id as number)
        .subscribe((metodoExame) => {
          this.versaoExame.metodoExame = metodoExame;
          this.metodoExames.push(metodoExame);
        });
    });
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
    if (this.id > 0) {
      this.updateVersaoExame();
    } else {
      this.versaoExameService.create(this.versaoExame).subscribe(() => {
        this.versaoExameService.showMessage('Versão de exame criada com sucesso!');
        this.router.navigate(['/versao_exames']).then(() => {
          window.location.reload();
        });
      });
    }
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
