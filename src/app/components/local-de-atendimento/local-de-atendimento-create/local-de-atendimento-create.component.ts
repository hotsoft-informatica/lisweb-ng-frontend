import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Query } from '../../model/query.model';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { GrupoLocalAtendimento } from '../../model/grupo-local-atendimento.model';
import { GrupoLocalAtendimentoService } from '../../service/grupo-local-atendimento.service';
import { FormsModule } from '@angular/forms';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { LocalDeAtendimentoEmpresaComponent } from './local-de-atendimento-empresa/local-de-atendimento-empresa.component';
import { LocalDeAtendimentoEnderecoComponent } from './local-de-atendimento-endereco/local-de-atendimento-endereco.component';
import { LocalDeAtendimentoHorarioFuncionamentoComponent } from './local-de-atendimento-horario-funcionamento/local-de-atendimento-horario-funcionamento.component';
import { LocalDeAtendimentoContatoComponent } from "./local-de-atendimento-contato/local-de-atendimento-contato.component";
import { LocalDeAtendimentoUrgenciaComponent } from './local-de-atendimento-urgencia/local-de-atendimento-urgencia.component';
import { LocalDeAtendimentoService } from './../../service/local-de-atendimento.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, debounceTime } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-local-de-atendimento-create',
  templateUrl: './local-de-atendimento-create.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, LocalDeAtendimentoContatoComponent, NgIf,
    MatRadioModule, MatCheckboxModule, MatTabsModule, MatIconModule, LocalDeAtendimentoContatoComponent,
    LocalDeAtendimentoEmpresaComponent, LocalDeAtendimentoEnderecoComponent, MatAutocompleteModule, NgFor,
    LocalDeAtendimentoHorarioFuncionamentoComponent, MatButtonModule, LocalDeAtendimentoUrgenciaComponent
  ]
})
export class LocalDeAtendimentoCreateComponent implements OnInit {
  @Input('grupos_locais_atendimento') grupos_locais_atendimento: GrupoLocalAtendimento[] = [];
  localAtendimento: LocalDeAtendimento;
  id: number;
  registroDeColeta = false;
  biometria = false;
  painelMonitoramento = false;
  resultadosCRM = false;
  etiquetaApoioRec = false;
  dadoAdicionalTriagem = false;
  coletaExterna = null;
  queries: Query[] = [];

  @ViewChild('grupo_local_id') grupo_local_id!: ElementRef;

  subjectGrupoLocaisAtendimento: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grupoLocalAtendimentoService: GrupoLocalAtendimentoService,
    private localAtendimentoService: LocalDeAtendimentoService,
    private empresaService: EmpresaService,
  ) {
    this.localAtendimento ||= new LocalDeAtendimento({});
    this.localAtendimento.empresa ||= new Empresa({});
    this.localAtendimento.grupo_local ||= new GrupoLocalAtendimento({});

    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.id > 0) {
      this.load(this.id);
    }
  }

  load(id: number): void {
    this.localAtendimentoService.readById(id).subscribe((localAtendimento) => {
      this.localAtendimento = localAtendimento;
      this.registroDeColeta = (this.localAtendimento.utiliza_coleta === 'S') ? true : false;
      this.biometria = (this.localAtendimento.usa_biometria === 'S') ? true : false;
      this.painelMonitoramento = (this.localAtendimento.painel_monitoramento === 'S') ? true : false;
      this.resultadosCRM = (this.localAtendimento.utiliza_crm === 'S') ? true : false;
      //this.dadoAdicionalTriagem = (this.localAtendimento.utiliza_coleta === 'S') ? true : false;
      this.empresaService
        .readById(this.localAtendimento.empresa_id as number) // relacao empresa local
        .subscribe ((empresa) => {
          // TODO: Revisar
          this.localAtendimento.empresa = empresa;
        });

        this.grupoLocalAtendimentoService
        .readById(this.localAtendimento.grupo_local_id as number) // relacao grupo local
        .subscribe ((grupo_local) => {
          // TODO: Revisar
          this.localAtendimento.grupo_local = grupo_local;
        });
    });
  }

  ngOnInit(): void {
    this.localAtendimento ||= new LocalDeAtendimento({});

    const query = new Query({ key: '', value: '', isNumeric: false });
    const empresa_id = this.localAtendimento.empresa_id || 0

    if (empresa_id > 0) {
      this.empresaService.readById(this.localAtendimento.empresa_id as number).subscribe(
        (empresa) => {
          this.localAtendimento.empresa = empresa;
      });

      this.grupoLocalAtendimentoService.readById(this.localAtendimento.grupo_local_id as number).subscribe(
        (grupo_local) => {
          this.localAtendimento.grupo_local = grupo_local;
      });
    }

    this.subjectGrupoLocaisAtendimento.subscribe(() => {
      this.grupoLocalAtendimentoService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((grupo_local) => {
          console.table(this.queries);
          this.grupos_locais_atendimento = grupo_local;
        });
    });
    this.subjectGrupoLocaisAtendimento.next(null);
  }

  searchGrupoLocalAtendimento(): void {
    const query_string = this.localAtendimento.grupo_local_id as unknown as string;
    const query = new Query({
      key: 'nome',
      value: query_string,
      isNumeric: false,
    });
    console.warn(query_string);
    this.queries = [];
    this.queries.push(query);
    this.subjectGrupoLocaisAtendimento.next(null);
  }

  displayFnGrupoLocalAtendimento(options: GrupoLocalAtendimento[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options) ? options.find((option) => option.id == id) : null;
      return correspondingOption ? correspondingOption.nome : '';
    };
  }

  updateCheckBox(): void {
    this.localAtendimento.utiliza_coleta = this.registroDeColeta ? 'S' : 'N';
    this.localAtendimento.usa_biometria = this.biometria ? 'S' : 'N';
    this.localAtendimento.painel_monitoramento = this.painelMonitoramento ? 'S' : 'N';
    this.localAtendimento.utiliza_crm = this.resultadosCRM ? 'S' : 'N';
    this.localAtendimento.coleta_externa = this.coletaExterna ? 'S' : 'N';
    //this.localAtendimento.dadoAdicionalTriagem = this.dadoAdicionalTriagem ? 'S' : 'N';
  }

  update(): void {
    this.updateCheckBox();
    this.empresaService.update(this.localAtendimento.empresa).subscribe(() => {

      this.localAtendimentoService.update(this.localAtendimento).subscribe(() => {
        this.localAtendimentoService.showMessage('Local Atendimento atualizado com sucesso!');
        this.router.navigate(['/localdeatendimento/read']).then(() => {
          window.location.reload();
        });
      });
    });
  }

  createLocalAtendimento(): void {
    if (this.id > 0){
      this.update();
    }else{
      this.updateCheckBox();
      this.empresaService.create(this.localAtendimento.empresa).subscribe(() => {

        this.localAtendimentoService.create(this.localAtendimento).subscribe(() => {
          this.localAtendimentoService.showMessage('Local Atendimento criado com sucesso!');
          this.router.navigate(['/localdeatendimento/read']).then(() => {
            window.location.reload();
          });
        });
      });
    }
  }

  cancel(): void {
    // retorna /localdeatendimento
    this.router.navigate(['/localdeatendimento/read']);
   }

}
