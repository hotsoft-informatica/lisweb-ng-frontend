import { Query } from '../../model/query.model';
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
  Input,
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
  tipoExames: TipoExame[] = [];
  metodoExames: MetodoExame[] = [];
  marcacoes: Marcacao[] = [];
  queries: Query[] = [];

  subject: Subject<any> = new Subject();
  id: number;

  isEdit: boolean = false;
  onEdit!: boolean;
  onCreate!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private versaoExameService: VersaoExameService,
    private tipoExameService: TipoExameService,
    private marcacaoService: MarcacaoService,
    private metodoExameService: MetodoExameService

  ) {
    console.log('Construtor');
    this.onEdit = this.route.snapshot.paramMap.get('edit') as unknown as boolean;
    this.onCreate = this.route.snapshot.paramMap.get('create') as unknown as boolean;

    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.id > 0) {
      this.loadVersaoExame(this.id);
      this.onEdit = true;
    } else {
      this.onCreate = true;
    }
    this.versaoExame ||= new VersaoExame({tipoExame: new TipoExame({})});
  }

  ngOnInit(): void {
    console.log('ngOnInit');
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
    console.log('Update');
    this.versaoExameService.update(this.versaoExame).subscribe((versaoExame) => {
      this.versaoExame = versaoExame;

      this.router.navigate(['/versao_exames']).then(() => {
        window.location.reload();
      });
    });

  }

  loadVersaoExame(id: number): void {
    console.log('Load');
    this.versaoExameService.readById(id).subscribe((versaoExame) => {
      this.versaoExame = versaoExame;
      console.warn(this.versaoExame.tipo_exame_id);

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
    console.log('Search');
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
    console.log('Create');
    console.table(this.versaoExame.tipoExame);
    this.tipoExameService.readById(this.versaoExame.tipoExame!.id as number).subscribe((tipoExame) =>{
      this.versaoExame.tipoExame = tipoExame;
      this.versaoExame.tipo_exame_id = tipoExame.id;
      if (this.id > 0) {
        this.updateVersaoExame();
        this.onEdit = false;
        this.onCreate = false;
      } else {
        this.versaoExameService.create(this.versaoExame).subscribe(() => {
          this.versaoExameService.showMessage('Versão de exame criada com sucesso!');
          this.onEdit = false;
          this.onCreate = false;
          this.router.navigate(['/versao_exames']).then(() => {
            window.location.reload();
          });
        });
      }
    })
  }

  cancel(): void {
    this.onEdit = false;
    this.onCreate = false;
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
