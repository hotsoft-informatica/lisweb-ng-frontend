import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Marcacao } from 'src/app/components/model/marcacao.model';
import { MarcacaoService } from 'src/app/components/service/marcacao.service';
import { MetodoExame } from 'src/app/components/model/metodo-exame.model';
import { MetodoExameService } from 'src/app/components/service/metodo-exame.service';
import { ParametroVersaoExame } from '../../model/parametro-versao-exame.model';
import { ParametroVersaoExameService } from '../../service/parametro-versao-exame.service';
import { Query } from '../../model/query.model';
import { TipoExame } from 'src/app/components/model/tipo-exame.model';
import { TipoExameService } from '../../service/tipo-exame.service';
import { VersaoExame } from '../../model/versao-exame.model';
import { VersaoExameParametroComponent } from '../versao-exame-parametro/versao-exame-parametro.component';
import { VersaoExameService } from '../../service/versao-exame.service';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { tap, debounceTime } from 'rxjs/operators';
import { Subject, forkJoin, Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { VersaoExameInterfaceamentoCreateComponent } from './versao-exame-interfaceamento-create/versao-exame-interfaceamento-create.component';
import { VersaoExameGeralCreateComponent } from './versao-exame-geral-create/versao-exame-geral-create.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AutoCompleteVersaoExameComponent } from '../../auto-complete/autocomplete-versao-exame/autocomplete-versao-exame.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgForOf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { merge } from 'rxjs';

@Component({
  selector: 'app-versao-exame-create',
  templateUrl: './versao-exame-create.component.html',
  standalone: true,
  imports: [
    NgIf, NgForOf, MatFormFieldModule, MatInputModule, AutoCompleteVersaoExameComponent,
    MatSlideToggleModule, FormsModule, MatTabsModule, VersaoExameGeralCreateComponent,
    VersaoExameInterfaceamentoCreateComponent, VersaoExameParametroComponent, MatButtonModule,
    MatAutocompleteModule, MatPaginatorModule, MatSortModule
  ]
})

export class VersaoExameCreateComponent implements OnInit, AfterViewInit {
  @Input('tipos_exame') tipos_exame: TipoExame[] = [];
  versaoExame: VersaoExame;
  tipoExames: TipoExame[] = [];
  versao_exames: any[] = [];
  parametrosVersaoExame: ParametroVersaoExame[] = [];
  metodoExames: MetodoExame[] = [];
  marcacoes: Marcacao[] = [];
  id: number;
  isEdit: boolean = false;
  onEdit!: boolean;
  onCreate!: boolean;
  totalCount!: number;
  requests: Observable<any>[] = [];

  query: Query[] = [];
  queries: Query[] = [];
  datasource = new MatTableDataSource<any>([]);
  subjectTipoExame: Subject<any> = new Subject();

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(VersaoExameParametroComponent)

  private parametrosComponent!: VersaoExameParametroComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private versaoExameService: VersaoExameService,
    private tipoExameService: TipoExameService,
    private marcacaoService: MarcacaoService,
    private metodoExameService: MetodoExameService,
    private parametroVersaoExameService: ParametroVersaoExameService

  ) {
    this.versaoExame ||= new VersaoExame({});
    this.onEdit = this.route.snapshot.paramMap.get('edit') as unknown as boolean;
    this.onCreate = this.route.snapshot.paramMap.get('create') as unknown as boolean;
    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;

    if (this.id > 0) {
      this.loadVersaoExame(this.id);
      this.onEdit = true;
    } else {
      this.onCreate = true;
    }

    this.versaoExame ||= new VersaoExame({ tipoExame: new TipoExame({}) });
  }

  ngOnInit(): void {
    this.versaoExameService.count().subscribe((totalCount) => {
      this.totalCount = totalCount;
    });

    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subjectTipoExame.pipe(debounceTime(500)).subscribe(() => {
      this.tipoExameService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((tipos_exame) => {
          this.tipos_exame = tipos_exame;
        });
    });
    this.subjectTipoExame.next(null);
  }

  ngAfterViewInit(): void {
    this.loadPage();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); // reseta o paginador depois de ordenar

    merge(this.sort.sortChange, this.paginator.page) // Na ordenação ou paginação, carrega uma nova página
      .pipe(tap(() => this.loadPage()))
      .subscribe();

    this.parametrosVersaoExame = this.parametrosComponent.parametrosVersaoExame;
  }

  loadPage() {
    this.versaoExameService
      .find(this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize, this.query
      ).subscribe((versao_exames: any[]) => {
        this.versao_exames = versao_exames;
        this.datasource.data = [...this.versao_exames];
      });
  }

  loadVersaoExame(id: number): void {
    this.versaoExameService.readById(id).subscribe((versaoExame) => {
      this.versaoExame = versaoExame;

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
          this.tipos_exame.push(tipoExame);
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

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.paginator.pageIndex = 0;
    this.loadPage();
  }

  searchTipoExame(): void {
    const query_string = this.versaoExame
      .tipo_exame_id as unknown as string;
    const query = new Query({
      key: 'descricao',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectTipoExame.next(null);
  }

  displayFnTipoExame(options: TipoExame[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.descricao : '';
    };
  }

  updateVersaoExame(): void {
    // Traz o dado do componente filho
    this.parametrosVersaoExame = this.parametrosComponent.parametrosVersaoExame;

    this.versaoExameService.update(this.versaoExame).subscribe((versaoExame) => {
      this.versaoExame = versaoExame;

      this.parametrosComponent.parametrosApagados.forEach((parametroApagado) => {
        console.log("Apagando o parametro: " + parametroApagado.id);
        if (parametroApagado.id as number > 0) {
          this.requests.push(this.parametroVersaoExameService
            .delete(parametroApagado.id as number));
        };
      });

      // Salva os parametros
      this.parametrosVersaoExame.forEach((parametroVersaoExame) => {
        parametroVersaoExame.versao_exame_id = this.versaoExame.id;

        if (parametroVersaoExame.id as number > 0) {
          this.requests.push(this.parametroVersaoExameService
            .update(parametroVersaoExame));
        } else {
          this.requests.push(this.parametroVersaoExameService
            .create(parametroVersaoExame));
        }
      });

      if (this.requests.length == 0) {
        this.router.navigate(['/versao_exames']).then(() => {
        });
      }

      forkJoin(this.requests).subscribe(() => {
        this.requests = [];
        this.router.navigate(['/versao_exames']).then(() => {
        });
      });
    });
  }

  createVersaoExame(): void {
    console.table(this.versaoExame.tipoExame);
    this.tipoExameService.readById(this.versaoExame.tipoExame!.id as number).subscribe((tipoExame) => {
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

  crossOffParametrosVersaoExame(parametrosVersaoExame: ParametroVersaoExame[]): void {
    this.parametrosVersaoExame = parametrosVersaoExame;
  }
}
