import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './views/home/home.component';
import { LaboratoryDomainCrudComponent } from './views/laboratory-domain-crud/laboratory-domain-crud.component';
import { LaboratoryDomainCreateComponent } from './components/laboratory-domain/laboratory-domain-create/laboratory-domain-create.component';
import { LaboratoryDomainReadComponent } from './components/laboratory-domain/laboratory-domain-read/laboratory-domain-read.component';
import { LaboratoryDomainUpdateComponent } from './components/laboratory-domain/laboratory-domain-update/laboratory-domain-update.component';
import { LaboratoryDomainDeleteComponent } from './components/laboratory-domain/laboratory-domain-delete/laboratory-domain-delete.component';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { LaboratorioCreateComponent } from './components/laboratorio/laboratorio-create/laboratorio-create.component';
import { LaboratorioDeleteComponent } from './components/laboratorio/laboratorio-delete/laboratorio-delete.component';
import { LaboratorioReadComponent } from './components/laboratorio/laboratorio-read/laboratorio-read.component';
import { LaboratorioUpdateComponent } from './components/laboratorio/laboratorio-update/laboratorio-update.component';
import { LaboratorioCrudComponent } from './views/laboratorio-crud/laboratorio-crud.component';
import { getPtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';
import { AmostraCreateComponent } from './components/amostra/amostra-create/amostra-create.component';
import { AmostraReadComponent } from './components/amostra/amostra-read/amostra-read.component';
import { AmostraDeleteComponent } from './components/amostra/amostra-delete/amostra-delete.component';
import { AmostraUpdateComponent } from './components/amostra/amostra-update/amostra-update.component';
import { BancadaCreateComponent } from './components/bancada/bancada-create/bancada-create.component';
import { BancadaReadComponent } from './components/bancada/bancada-read/bancada-read.component';
import { BancadaUpdateComponent } from './components/bancada/bancada-update/bancada-update.component';
import { BancadaDeleteComponent } from './components/bancada/bancada-delete/bancada-delete.component';
import { BandejaCreateComponent } from './components/bandeja/bandeja-create/bandeja-create.component';
import { BandejaReadComponent } from './components/bandeja/bandeja-read/bandeja-read.component';
import { BandejaUpdateComponent } from './components/bandeja/bandeja-update/bandeja-update.component';
import { BandejaDeleteComponent } from './components/bandeja/bandeja-delete/bandeja-delete.component';
import { BandejaAmostraCreateComponent } from './components/bandeja-amostra/bandeja-amostra-create/bandeja-amostra-create.component';
import { BandejaAmostraReadComponent } from './components/bandeja-amostra/bandeja-amostra-read/bandeja-amostra-read.component';
import { BandejaAmostraUpdateComponent } from './components/bandeja-amostra/bandeja-amostra-update/bandeja-amostra-update.component';
import { BandejaAmostraDeleteComponent } from './components/bandeja-amostra/bandeja-amostra-delete/bandeja-amostra-delete.component';
import { ColetorCreateComponent } from './components/coletor/coletor-create/coletor-create.component';
import { ColetorReadComponent } from './components/coletor/coletor-read/coletor-read.component';
import { ColetorUpdateComponent } from './components/coletor/coletor-update/coletor-update.component';
import { ColetorDeleteComponent } from './components/coletor/coletor-delete/coletor-delete.component';
import { ExameAmostraDeleteComponent } from './components/exame-amostra/exame-amostra-delete/exame-amostra-delete.component';
import { ExameAmostraCreateComponent } from './components/exame-amostra/exame-amostra-create/exame-amostra-create.component';
import { ExameAmostraReadComponent } from './components/exame-amostra/exame-amostra-read/exame-amostra-read.component';
import { ExameAmostraUpdateComponent } from './components/exame-amostra/exame-amostra-update/exame-amostra-update.component';
import { ExameUpdateComponent } from './components/exame/exame-update/exame-update.component';
import { ExameCreateComponent } from './components/exame/exame-create/exame-create.component';
import { ExameReadComponent } from './components/exame/exame-read/exame-read.component';
import { ExameDeleteComponent } from './components/exame/exame-delete/exame-delete.component';
import { LoteAmostraDeleteComponent } from './components/lote-amostra/lote-amostra-delete/lote-amostra-delete.component';
import { LoteAmostraCreateComponent } from './components/lote-amostra/lote-amostra-create/lote-amostra-create.component';
import { LoteAmostraReadComponent } from './components/lote-amostra/lote-amostra-read/lote-amostra-read.component';
import { LoteAmostraUpdateComponent } from './components/lote-amostra/lote-amostra-update/lote-amostra-update.component';
import { MaterialBiologicoUpdateComponent } from './components/material-biologico/material-biologico-update/material-biologico-update.component';
import { MaterialBiologicoCreateComponent } from './components/material-biologico/material-biologico-create/material-biologico-create.component';
import { MaterialBiologicoReadComponent } from './components/material-biologico/material-biologico-read/material-biologico-read.component';
import { MaterialBiologicoDeleteComponent } from './components/material-biologico/material-biologico-delete/material-biologico-delete.component';
import { PacienteCreateComponent } from './components/paciente/paciente-create/paciente-create.component';
import { PacienteReadComponent } from './components/paciente/paciente-read/paciente-read.component';
import { PacienteDeleteComponent } from './components/paciente/paciente-delete/paciente-delete.component';
import { PacienteUpdateComponent } from './components/paciente/paciente-update/paciente-update.component';
import { RequisicaoUpdateComponent } from './components/requisicao/requisicao-update/requisicao-update.component';
import { RequisicaoCreateComponent } from './components/requisicao/requisicao-create/requisicao-create.component';
import { RequisicaoReadComponent } from './components/requisicao/requisicao-read/requisicao-read.component';
import { RequisicaoDeleteComponent } from './components/requisicao/requisicao-delete/requisicao-delete.component';
import { TipoExameCreateComponent } from './components/tipo-exame/tipo-exame-create/tipo-exame-create.component';
import { TipoExameReadComponent } from './components/tipo-exame/tipo-exame-read/tipo-exame-read.component';
import { TipoExameUpdateComponent } from './components/tipo-exame/tipo-exame-update/tipo-exame-update.component';
import { TipoExameDeleteComponent } from './components/tipo-exame/tipo-exame-delete/tipo-exame-delete.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { UsuarioReadComponent } from './components/usuario/usuario-read/usuario-read.component';
import { VersaoExameCreateComponent } from './components/versao-exame/versao-exame-create/versao-exame-create.component';
import { VersaoExameReadComponent } from './components/versao-exame/versao-exame-read/versao-exame-read.component';
import { VersaoExameUpdateComponent } from './components/versao-exame/versao-exame-update/versao-exame-update.component';
import { VersaoExameDeleteComponent } from './components/versao-exame/versao-exame-delete/versao-exame-delete.component';
import { PacienteCreateDadosPessoaisComponent } from './components/paciente/paciente-create/paciente-create-dados-pessoais/paciente-create-dados-pessoais.component';
import { PacienteCreateDadosOutrosComponent } from './components/paciente/paciente-create/paciente-create-dados-outros/paciente-create-dados-outros.component';
import { PacienteCreateDadosConvenioComponent } from './components/paciente/paciente-create/paciente-create-dados-outros/paciente-create-dados-convenio/paciente-create-dados-convenio.component';
import { PacienteCreateDadosContatosComponent } from './components/paciente/paciente-create/paciente-create-dados-outros/paciente-create-dados-contatos/paciente-create-dados-contatos.component';
import { PacienteCreateDadosEnderecoComponent } from './components/paciente/paciente-create/paciente-create-dados-outros/paciente-create-dados-endereco/paciente-create-dados-endereco.component';
import { ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LaboratoryDomainCrudComponent,
    LaboratoryDomainCreateComponent,
    LaboratoryDomainReadComponent,
    LaboratoryDomainUpdateComponent,
    LaboratoryDomainDeleteComponent,
    LaboratorioCreateComponent,
    LaboratorioDeleteComponent,
    LaboratorioReadComponent,
    LaboratorioUpdateComponent,
    LaboratorioCrudComponent,
    AmostraCreateComponent,
    AmostraReadComponent,
    AmostraDeleteComponent,
    AmostraUpdateComponent,
    BancadaCreateComponent,
    BancadaReadComponent,
    BancadaUpdateComponent,
    BancadaDeleteComponent,
    BandejaCreateComponent,
    BandejaReadComponent,
    BandejaUpdateComponent,
    BandejaDeleteComponent,
    BandejaAmostraCreateComponent,
    BandejaAmostraReadComponent,
    BandejaAmostraUpdateComponent,
    BandejaAmostraDeleteComponent,
    ColetorCreateComponent,
    ColetorReadComponent,
    ColetorUpdateComponent,
    ColetorDeleteComponent,
    ExameAmostraDeleteComponent,
    ExameAmostraCreateComponent,
    ExameAmostraReadComponent,
    ExameAmostraUpdateComponent,
    ExameUpdateComponent,
    ExameCreateComponent,
    ExameReadComponent,
    ExameDeleteComponent,
    LoteAmostraDeleteComponent,
    LoteAmostraCreateComponent,
    LoteAmostraReadComponent,
    LoteAmostraUpdateComponent,
    MaterialBiologicoUpdateComponent,
    MaterialBiologicoCreateComponent,
    MaterialBiologicoReadComponent,
    MaterialBiologicoDeleteComponent,
    PacienteCreateComponent,
    PacienteReadComponent,
    PacienteDeleteComponent,
    PacienteUpdateComponent,
    RequisicaoUpdateComponent,
    RequisicaoCreateComponent,
    RequisicaoReadComponent,
    RequisicaoDeleteComponent,
    TipoExameCreateComponent,
    TipoExameReadComponent,
    TipoExameUpdateComponent,
    TipoExameDeleteComponent,
    UsuarioDeleteComponent,
    UsuarioCreateComponent,
    UsuarioUpdateComponent,
    UsuarioReadComponent,
    VersaoExameCreateComponent,
    VersaoExameReadComponent,
    VersaoExameUpdateComponent,
    VersaoExameDeleteComponent,
    PacienteCreateDadosPessoaisComponent,
    PacienteCreateDadosOutrosComponent,
    PacienteCreateDadosConvenioComponent,
    PacienteCreateDadosContatosComponent,
    PacienteCreateDadosEnderecoComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatSortModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
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
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
