import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputCounterModule } from '@angular-material-extensions/input-counter';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { getPtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';

// TODO: Substituir NgAutoCompleteModule
// import { NgAutoCompleteModule } from 'ng-auto-complete';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { RecursoComponent } from './components/recurso/recurso.component'
import { AmostraCreateComponent } from './components/amostra/amostra-create/amostra-create.component';
import { AmostraDeleteComponent } from './components/amostra/amostra-delete/amostra-delete.component';
import { AmostraReadComponent } from './components/amostra/amostra-read/amostra-read.component';
import { AmostraUpdateComponent } from './components/amostra/amostra-update/amostra-update.component';
import { AutocompleteTipoInterfaceamentoComponent } from './components/auto-complete/autocomplete-tipo-interfaceamento/autocomplete-tipo-interfaceamento.component';
import { AutoCompleteVersaoExameComponent } from './components/auto-complete/autocomplete-versao-exame/autocomplete-versao-exame.component';
import { BackendIpComponent } from './components/config/backend-ip/backend-ip.component';
import { BancadaCreateComponent } from './components/bancada/bancada-create/bancada-create.component';
import { BancadaDeleteComponent } from './components/bancada/bancada-delete/bancada-delete.component';
import { BancadaReadComponent } from './components/bancada/bancada-read/bancada-read.component';
import { BancadaUpdateComponent } from './components/bancada/bancada-update/bancada-update.component';
import { BandejaAmostraCreateComponent } from './components/bandeja-amostra/bandeja-amostra-create/bandeja-amostra-create.component';
import { BandejaAmostraDeleteComponent } from './components/bandeja-amostra/bandeja-amostra-delete/bandeja-amostra-delete.component';
import { BandejaAmostraReadComponent } from './components/bandeja-amostra/bandeja-amostra-read/bandeja-amostra-read.component';
import { BandejaAmostraUpdateComponent } from './components/bandeja-amostra/bandeja-amostra-update/bandeja-amostra-update.component';
import { BandejaCreateComponent } from './components/bandeja/bandeja-create/bandeja-create.component';
import { BandejaDeleteComponent } from './components/bandeja/bandeja-delete/bandeja-delete.component';
import { BandejaReadComponent } from './components/bandeja/bandeja-read/bandeja-read.component';
import { BandejaUpdateComponent } from './components/bandeja/bandeja-update/bandeja-update.component';
import { ColetorCreateComponent } from './components/coletor/coletor-create/coletor-create.component';
import { ColetorDeleteComponent } from './components/coletor/coletor-delete/coletor-delete.component';
import { ColetorReadComponent } from './components/coletor/coletor-read/coletor-read.component';
import { ColetorUpdateComponent } from './components/coletor/coletor-update/coletor-update.component';
import { ConfigComponent } from './components/config/config.component';
import { ConsultaAmostraShowComponent } from './components/consulta-amostra/consulta-amostra-show/consulta-amostra-show.component';
import { DialogErroAutenticacaoComponent } from './components/DiaLog/dialog-erro-autenticacao/dialog-erro-autenticacao.component';
import { DialogErroQuinhentosComponent } from './components/DiaLog/dialog-erro-quinhentos/dialog-erro-quinhentos.component';
import { DominioComponent } from './components/dominio/dominio.component';
import { EmpresaCreateComponent } from './components/empresa/empresa-create/empresa-create.component';
import { EmpresaCrudComponent } from './views/empresa-crud/empresa-crud.component';
import { EmpresaDeleteComponent } from './components/empresa/empresa-delete/empresa-delete.component';
import { EmpresaReadComponent } from './components/empresa/empresa-read/empresa-read.component';
import { EmpresaShowComponent } from './components/empresa/empresa-show/empresa-show.component';
import { EmpresaUpdateComponent } from './components/empresa/empresa-update/empresa-update.component';
import { ErroInterceptorModule } from './components/model/erro-interceptor.module';
import { ExameAmostraCreateComponent } from './components/exame-amostra/exame-amostra-create/exame-amostra-create.component';
import { ExameAmostraDeleteComponent } from './components/exame-amostra/exame-amostra-delete/exame-amostra-delete.component';
import { ExameAmostraReadComponent } from './components/exame-amostra/exame-amostra-read/exame-amostra-read.component';
import { ExameAmostraUpdateComponent } from './components/exame-amostra/exame-amostra-update/exame-amostra-update.component';
import { ExameCreateComponent } from './components/exame/exame-create/exame-create.component';
import { ExameDeleteComponent } from './components/exame/exame-delete/exame-delete.component';
import { ExameReadComponent } from './components/exame/exame-read/exame-read.component';
import { ExameUpdateComponent } from './components/exame/exame-update/exame-update.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/template/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { InterceptorModule } from './components/model/interceptor.module';
import { LaboratorioCreateComponent } from './components/laboratorio/laboratorio-create/laboratorio-create.component';
import { LaboratorioCrudComponent } from './views/laboratorio-crud/laboratorio-crud.component';
import { LaboratorioDeleteComponent } from './components/laboratorio/laboratorio-delete/laboratorio-delete.component';
import { LaboratorioReadComponent } from './components/laboratorio/laboratorio-read/laboratorio-read.component';
import { LaboratorioUpdateComponent } from './components/laboratorio/laboratorio-update/laboratorio-update.component';
import { LaboratoryDomainCreateComponent } from './components/laboratory-domain/laboratory-domain-create/laboratory-domain-create.component';
import { LaboratoryDomainCrudComponent } from './views/laboratory-domain-crud/laboratory-domain-crud.component';
import { LaboratoryDomainDeleteComponent } from './components/laboratory-domain/laboratory-domain-delete/laboratory-domain-delete.component';
import { LaboratoryDomainReadComponent } from './components/laboratory-domain/laboratory-domain-read/laboratory-domain-read.component';
import { LaboratoryDomainUpdateComponent } from './components/laboratory-domain/laboratory-domain-update/laboratory-domain-update.component';
import { LaboratoryGetFilterCreateComponent } from './components/laboratory-get-filter/laboratory-get-filter-create/laboratory-get-filter-create.component';
import { LaboratoryGetFilterDeleteComponent } from './components/laboratory-get-filter/laboratory-get-filter-delete/laboratory-get-filter-delete.component';
import { LaboratoryGetFilterReadComponent } from './components/laboratory-get-filter/laboratory-get-filter-read/laboratory-get-filter-read.component';
import { LaboratoryGetFilterUpdateComponent } from './components/laboratory-get-filter/laboratory-get-filter-update/laboratory-get-filter-update.component';
import { LancamentoComponent } from './components/lancamento/lancamento.component';
import { LgSenhaComponent } from './components/login/lg-senha/lg-senha.component';
import { LgUserComponent } from './components/login/lg-user/lg-user.component';
import { LgUsuarioComponent } from './components/login/lg-usuario/lg-usuario.component';
import { LocalDeAtendimentoCreateComponent } from './components/local-de-atendimento/local-de-atendimento-create/local-de-atendimento-create.component';
import { LocalDeAtendimentoDeleteComponent } from './components/local-de-atendimento/local-de-atendimento-delete/local-de-atendimento-delete.component';
import { LocalDeAtendimentoEmpresaComponent } from './components/local-de-atendimento/local-de-atendimento-create/local-de-atendimento-empresa/local-de-atendimento-empresa.component';
import { LocalDeAtendimentoEnderecoComponent } from './components/local-de-atendimento/local-de-atendimento-create/local-de-atendimento-endereco/local-de-atendimento-endereco.component';
import { LocalDeAtendimentoHorarioFuncionamentoComponent } from './components/local-de-atendimento/local-de-atendimento-create/local-de-atendimento-horario-funcionamento/local-de-atendimento-horario-funcionamento.component';
import { LocalDeAtendimentoReadComponent } from './components/local-de-atendimento/local-de-atendimento-read/local-de-atendimento-read.component';
import { LocalDeAtendimentoUpdateComponent } from './components/local-de-atendimento/local-de-atendimento-update/local-de-atendimento-update.component';
import { LoginComponent } from './components/login/login.component';
import { LoteAmostraCreateComponent } from './components/lote-amostra/lote-amostra-create/lote-amostra-create.component';
import { LoteAmostraDeleteComponent } from './components/lote-amostra/lote-amostra-delete/lote-amostra-delete.component';
import { LoteAmostraReadComponent } from './components/lote-amostra/lote-amostra-read/lote-amostra-read.component';
import { LoteAmostraUpdateComponent } from './components/lote-amostra/lote-amostra-update/lote-amostra-update.component';
import { MarcacaoCreateComponent } from './components/marcacao/marcacao-create/marcacao-create.component';
import { MarcacaoDeleteComponent } from './components/marcacao/marcacao-delete/marcacao-delete.component';
import { MarcacaoReadComponent } from './components/marcacao/marcacao-read/marcacao-read.component';
import { MarcacaoTipoPipe } from './pipes/marcacao-tipo.pipe';
import { MaterialBiologicoCreateComponent } from './components/material-biologico/material-biologico-create/material-biologico-create.component';
import { MaterialBiologicoDeleteComponent } from './components/material-biologico/material-biologico-delete/material-biologico-delete.component';
import { MaterialBiologicoReadComponent } from './components/material-biologico/material-biologico-read/material-biologico-read.component';
import { MaterialBiologicoUpdateComponent } from './components/material-biologico/material-biologico-update/material-biologico-update.component';
import { MetodoExameComponent } from './components/metodo-exame/metodo-exame.component';
import { MetodosExamesCreateComponent } from './components/metodos-exames/metodos-exames-create/metodos-exames-create.component';
import { MetodosExamesDeleteComponent } from './components/metodos-exames/metodos-exames-delete/metodos-exames-delete.component';
import { MetodosExamesReadComponent } from './components/metodos-exames/metodos-exames-read/metodos-exames-read.component';
import { MetodosExamesUpdateComponent } from './components/metodos-exames/metodos-exames-update/metodos-exames-update.component';
import { NavComponent } from './components/template/nav/nav.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NotaComponent } from './components/nota/nota.component';
import { OperadoraCreateComponent } from './components/operadora/operadora-create/operadora-create.component';
import { OperadoraCrudComponent } from './views/operadora-crud/operadora-crud.component';
import { OperadoraDeleteComponent } from './components/operadora/operadora-delete/operadora-delete.component';
import { OperadoraReadComponent } from './components/operadora/operadora-read/operadora-read.component';
import { OperadoraShowComponent } from './components/operadora/operadora-show/operadora-show.component';
import { OperadoraUpdateComponent } from './components/operadora/operadora-update/operadora-update.component';
import { PacienteCreateComponent } from './components/paciente/paciente-create/paciente-create.component';
import { PacienteCreateDadosContatosComponent } from './components/paciente/paciente-create/paciente-create-dados-outros/paciente-create-dados-contatos/paciente-create-dados-contatos.component';
import { PacienteCreateDadosConvenioComponent } from './components/paciente/paciente-create/paciente-create-dados-outros/paciente-create-dados-convenio/paciente-create-dados-convenio.component';
import { PacienteCreateDadosEnderecoComponent } from './components/paciente/paciente-create/paciente-create-dados-outros/paciente-create-dados-endereco/paciente-create-dados-endereco.component';
import { PacienteCreateDadosOutrosComponent } from './components/paciente/paciente-create/paciente-create-dados-outros/paciente-create-dados-outros.component';
import { PacienteCreateDadosPessoaisComponent } from './components/paciente/paciente-create/paciente-create-dados-pessoais/paciente-create-dados-pessoais.component';
import { PacienteDeleteComponent } from './components/paciente/paciente-delete/paciente-delete.component';
import { PacienteReadComponent } from './components/paciente/paciente-read/paciente-read.component';
import { PacienteShowComponent } from './components/paciente/paciente-show/paciente-show.component';
import { PacienteUpdateComponent } from './components/paciente/paciente-update/paciente-update.component';
import { PessoaIdPipe } from './pipes/pessoa-id.pipe';
import { registerLocaleData } from '@angular/common';
import { RequisicaoCreateComponent } from './components/requisicao/requisicao-create/requisicao-create.component';
import { RequisicaoCrudComponent } from './views/requisicao-crud/requisicao-crud.component';
import { RequisicaoDeleteComponent } from './components/requisicao/requisicao-delete/requisicao-delete.component';
import { RequisicaoReadComponent } from './components/requisicao/requisicao-read/requisicao-read.component';
import { RequisicaoShowComponent } from './components/requisicao/requisicao-show/requisicao-show.component';
import { RequisicaoUpdateComponent } from './components/requisicao/requisicao-update/requisicao-update.component';
import { RequisicaoUpdateExamesComponent } from './components/requisicao/requisicao-update/requisicao-update-exames/requisicao-update-exames.component';
import { ResponsavelTecnicoCreateComponent } from './components/responsavel-tecnico/responsavel-tecnico-create/responsavel-tecnico-create.component';
import { ResponsavelTecnicoCrudComponent } from './views/responsavel-tecnico-crud/responsavel-tecnico-crud.component';
import { ResponsavelTecnicoReadComponent } from './components/responsavel-tecnico/responsavel-tecnico-read/responsavel-tecnico-read.component';
import { ResponsavelTecnicoShowComponent } from './components/responsavel-tecnico/responsavel-tecnico-show/responsavel-tecnico-show.component';
import { ResponsavelTecnicoUpdateComponent } from './components/responsavel-tecnico/responsavel-tecnico-update/responsavel-tecnico-update.component';
import { ResponsavelTecnicoUploadComponent } from './components/responsavel-tecnico/responsavel-tecnico-upload/responsavel-tecnico-upload.component';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { TipoExameCreateComponent } from './components/tipo-exame/tipo-exame-create/tipo-exame-create.component';
import { TipoExameDeleteComponent } from './components/tipo-exame/tipo-exame-delete/tipo-exame-delete.component';
import { TipoExameReadComponent } from './components/tipo-exame/tipo-exame-read/tipo-exame-read.component';
import { TipoExameUpdateComponent } from './components/tipo-exame/tipo-exame-update/tipo-exame-update.component';
import { TippyModule, tooltipVariation, popperVariation } from '@ngneat/helipopper';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UserComponent } from './components/user/user.component';
import { UserExitGuard } from './guards/user-exit.guard';
import { UserGuard } from './guards/user.guard';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioReadComponent } from './components/usuario/usuario-read/usuario-read.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { ValorReferenciaCreateComponent } from './components/valor-referencia/valor-referencia-create/valor-referencia-create.component';
import { ValorReferenciaReadComponent } from './components/valor-referencia/valor-referencia-read/valor-referencia-read.component';
import { ValorReferenciaSexoPipe } from './pipes/valor-referencia.pipe';
import { VersaoExameCreateComponent } from './components/versao-exame/versao-exame-create/versao-exame-create.component';
import { VersaoExameCrudComponent } from './views/versao-exame-crud/versao-exame-crud.component';
import { VersaoExameDeleteComponent } from './components/versao-exame/versao-exame-delete/versao-exame-delete.component';
import { VersaoExameGeralCreateComponent } from './components/versao-exame/versao-exame-create/versao-exame-geral-create/versao-exame-geral-create.component';
import { VersaoExameInterfaceamentoCreateComponent } from './components/versao-exame/versao-exame-create/versao-exame-interfaceamento-create/versao-exame-interfaceamento-create.component';
import { VersaoExameParametroComponent } from './components/versao-exame/versao-exame-parametro/versao-exame-parametro.component';
import { VersaoExameStatusPipe } from './pipes/versao-exame-status.pipe';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);
export const options: Partial<IConfig> | (() => Partial<IConfig>) | null = null;

@NgModule({
  declarations: [
    AmostraCreateComponent,
    AmostraDeleteComponent,
    AmostraReadComponent,
    AmostraUpdateComponent,
    AppComponent,
    AutocompleteTipoInterfaceamentoComponent,
    AutoCompleteVersaoExameComponent,
    BackendIpComponent,
    BancadaCreateComponent,
    BancadaDeleteComponent,
    BancadaReadComponent,
    BancadaUpdateComponent,
    BandejaAmostraCreateComponent,
    BandejaAmostraDeleteComponent,
    BandejaAmostraReadComponent,
    BandejaAmostraUpdateComponent,
    BandejaCreateComponent,
    BandejaDeleteComponent,
    BandejaReadComponent,
    BandejaUpdateComponent,
    ColetorCreateComponent,
    ColetorDeleteComponent,
    ColetorReadComponent,
    ColetorUpdateComponent,
    ConfigComponent,
    ConsultaAmostraShowComponent,
    DialogErroAutenticacaoComponent,
    DialogErroQuinhentosComponent,
    DominioComponent,
    EmpresaCreateComponent,
    EmpresaCrudComponent,
    EmpresaDeleteComponent,
    EmpresaReadComponent,
    EmpresaShowComponent,
    EmpresaUpdateComponent,
    ExameAmostraCreateComponent,
    ExameAmostraDeleteComponent,
    ExameAmostraReadComponent,
    ExameAmostraUpdateComponent,
    ExameCreateComponent,
    ExameDeleteComponent,
    ExameReadComponent,
    ExameUpdateComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LaboratorioCreateComponent,
    LaboratorioCrudComponent,
    LaboratorioDeleteComponent,
    LaboratorioReadComponent,
    LaboratorioUpdateComponent,
    LaboratoryDomainCreateComponent,
    LaboratoryDomainCrudComponent,
    LaboratoryDomainDeleteComponent,
    LaboratoryDomainReadComponent,
    LaboratoryDomainUpdateComponent,
    LaboratoryGetFilterCreateComponent,
    LaboratoryGetFilterDeleteComponent,
    LaboratoryGetFilterReadComponent,
    LaboratoryGetFilterUpdateComponent,
    LancamentoComponent,
    LgSenhaComponent,
    LgUserComponent,
    LgUsuarioComponent,
    LocalDeAtendimentoCreateComponent,
    LocalDeAtendimentoDeleteComponent,
    LocalDeAtendimentoEmpresaComponent,
    LocalDeAtendimentoEnderecoComponent,
    LocalDeAtendimentoHorarioFuncionamentoComponent,
    LocalDeAtendimentoReadComponent,
    LocalDeAtendimentoUpdateComponent,
    LoginComponent,
    LoteAmostraCreateComponent,
    LoteAmostraDeleteComponent,
    LoteAmostraReadComponent,
    LoteAmostraUpdateComponent,
    MarcacaoCreateComponent,
    MarcacaoDeleteComponent,
    MarcacaoReadComponent,
    MarcacaoTipoPipe,
    MaterialBiologicoCreateComponent,
    MaterialBiologicoDeleteComponent,
    MaterialBiologicoReadComponent,
    MaterialBiologicoUpdateComponent,
    MetodoExameComponent,
    MetodosExamesCreateComponent,
    MetodosExamesDeleteComponent,
    MetodosExamesReadComponent,
    MetodosExamesUpdateComponent,
    NavComponent,
    NotaComponent,
    OperadoraCreateComponent,
    OperadoraCrudComponent,
    OperadoraDeleteComponent,
    OperadoraReadComponent,
    OperadoraShowComponent,
    OperadoraUpdateComponent,
    PacienteCreateComponent,
    PacienteCreateDadosContatosComponent,
    PacienteCreateDadosConvenioComponent,
    PacienteCreateDadosEnderecoComponent,
    PacienteCreateDadosOutrosComponent,
    PacienteCreateDadosPessoaisComponent,
    PacienteDeleteComponent,
    PacienteReadComponent,
    PacienteShowComponent,
    PacienteUpdateComponent,
    PessoaIdPipe,
    RequisicaoCreateComponent,
    RequisicaoCrudComponent,
    RequisicaoDeleteComponent,
    RequisicaoReadComponent,
    RequisicaoShowComponent,
    RequisicaoUpdateComponent,
    RequisicaoUpdateExamesComponent,
    ResponsavelTecnicoCreateComponent,
    ResponsavelTecnicoCrudComponent,
    ResponsavelTecnicoReadComponent,
    ResponsavelTecnicoShowComponent,
    ResponsavelTecnicoUpdateComponent,
    ResponsavelTecnicoUploadComponent,
    RecursoComponent,
    SafeUrlPipe,
    TipoExameCreateComponent,
    TipoExameDeleteComponent,
    TipoExameReadComponent,
    TipoExameUpdateComponent,
    UploadFileComponent,
    UserComponent,
    UsuarioCreateComponent,
    UsuarioDeleteComponent,
    UsuarioReadComponent,
    UsuarioUpdateComponent,
    ValorReferenciaCreateComponent,
    ValorReferenciaReadComponent,
    ValorReferenciaSexoPipe,
    VersaoExameCreateComponent,
    VersaoExameCrudComponent,
    VersaoExameDeleteComponent,
    VersaoExameGeralCreateComponent,
    VersaoExameInterfaceamentoCreateComponent,
    VersaoExameParametroComponent,
    VersaoExameStatusPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputCounterModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
    AppRoutingModule,
    BrowserModule,
    ErroInterceptorModule,
    FormsModule,
    HttpClientModule,
    InterceptorModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      }
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en'
    })
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getPtBrMatPaginatorIntl(),
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    UserGuard,
    UserExitGuard,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
