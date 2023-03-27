import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { FormsModule } from '@angular/forms';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { LocalDeAtendimentoEmpresaComponent } from './local-de-atendimento-empresa/local-de-atendimento-empresa.component';
import { LocalDeAtendimentoEnderecoComponent } from './local-de-atendimento-endereco/local-de-atendimento-endereco.component';
import { LocalDeAtendimentoHorarioFuncionamentoComponent } from './local-de-atendimento-horario-funcionamento/local-de-atendimento-horario-funcionamento.component';
import { LocalDeAtendimentoService } from './../../service/local-de-atendimento.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-local-de-atendimento-create',
    templateUrl: './local-de-atendimento-create.component.html',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule,
      MatRadioModule, MatCheckboxModule, MatTabsModule,
      LocalDeAtendimentoEmpresaComponent, LocalDeAtendimentoEnderecoComponent,
      LocalDeAtendimentoHorarioFuncionamentoComponent]
})
export class LocalDeAtendimentoCreateComponent implements OnInit {
  localAtendimento: LocalDeAtendimento;
  id: number;
  empresa: Empresa;
  registroDeColeta = false;
  biometria = false;
  painelMonitoramento = false;
  resultadosCRM = false;
  etiquetaApoioRec = false;
  dadoAdicionalTriagem = false;
  coletaExterna = null;

  constructor(
    private router: Router,
    private localAtendimentoService: LocalDeAtendimentoService,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
  ) {
    this.localAtendimento = new LocalDeAtendimento({});
    this.empresa = new Empresa({});


    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.id > 0) {
      this.load(this.id);
    }
  }

  load(id: number): void {
    this.localAtendimentoService
      .readById(id)

      .subscribe((localAtendimento) => {
        this.localAtendimento = localAtendimento;
        this.registroDeColeta = (this.localAtendimento.utiliza_coleta === 'S') ? true : false;
        this.biometria = (this.localAtendimento.usa_biometria === 'S') ? true : false;
        this.painelMonitoramento = (this.localAtendimento.painel_monitoramento === 'S') ? true : false;
        this.resultadosCRM = (this.localAtendimento.utiliza_crm === 'S') ? true : false;
        //this.dadoAdicionalTriagem = (this.localAtendimento.utiliza_coleta === 'S') ? true : false;
        this.empresaService
          .readById(this.localAtendimento.empresa_id as number) // relacao empresa local
            .subscribe ((empresa) => {
              this.empresa = empresa;
              this.localAtendimento.empresa = empresa;
            });
      });
    this.empresa ||= new Empresa({});
  }


  ngOnInit(): void {
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
    this.empresaService.update(this.empresa).subscribe((empresa) => {
      this.localAtendimento.empresa_id = empresa.id;
      this.localAtendimento.empresa = empresa;
    });
    this.localAtendimentoService.update(this.localAtendimento).subscribe(() => {
    });
    this.router.navigate(['/localdeatendimento/read/']);
  }

  createLocalAtendimento(): void {
    if (this.id > 0){
      this.update();
    }
    else{
      this.updateCheckBox();
      this.empresaService.create(this.empresa).subscribe((empresa) => {
        this.localAtendimento.empresa_id = empresa.id;
        this.localAtendimento.empresa = empresa;
      });
      this.localAtendimentoService.create(this.localAtendimento).subscribe(() => {
        this.router.navigate(['/localdeatendimento/read']);
      });
    }
  }

  cancel(): void {
    // retorna /localdeatendimento
    this.router.navigate(['/localdeatendimento/read']);
   }

}
