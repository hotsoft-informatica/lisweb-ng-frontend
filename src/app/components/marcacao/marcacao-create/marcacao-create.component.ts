import { Query } from '../../model/query.model'
import { Marcacao } from 'src/app/components/model/marcacao.model'
import { MarcacaoService } from 'src/app/components/service/marcacao.service'
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-marcacao-create',
  templateUrl: './marcacao-create.component.html',
  styleUrls: ['./marcacao-create.component.css']
})
export class MarcacaoCreateComponent implements OnInit {
  marcacao: Marcacao;

  queries: Query[] = [];

  subject: Subject<any> = new Subject();
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private marcacaoService: MarcacaoService

  ) {
    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.id > 0) {
      this.loadMarcacao(this.id);
    }
    this.marcacao ||= new Marcacao({});
  }

  ngOnInit(): void { }

  updateMarcacao(): void {
    this.marcacaoService.update(this.marcacao).subscribe((marcacao) => {
      this.marcacao = marcacao;
    });
    this.router.navigate(['/marcacoes/read']).then(() => {
      window.location.reload();
    });
  }

  loadMarcacao(id: number): void {
    this.marcacaoService.readById(id).subscribe((marcacao) => {
      this.marcacao = marcacao;
    });
  }

  search(): void {
    const query_string = this.marcacao.id as unknown as string;
    const query = new Query({
      key: 'descricao',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subject.next(null);
  }

  createMarcacao(): void {
    if (this.id > 0) {
      this.updateMarcacao();
    } else {
      this.marcacaoService.create(this.marcacao).subscribe(() => {
        this.marcacaoService.showMessage('Tabela de marcação criada com sucesso!');
        this.router.navigate(['/marcacoes/read']).then(() => {
          window.location.reload();
        });
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/marcacoes/read']);
  }

}
