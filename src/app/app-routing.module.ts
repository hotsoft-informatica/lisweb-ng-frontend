import { UsuarioReadComponent } from './components/usuario/usuario-read/usuario-read.component';
import { LgSenhaComponent } from './components/login/lg-senha/lg-senha.component';
import { LoginComponent } from './components/login/login.component';
import { PacienteShowComponent } from './components/paciente/paciente-show/paciente-show.component';
import { PacienteReadComponent } from './components/paciente/paciente-read/paciente-read.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LaboratoryDomainCrudComponent } from './views/laboratory-domain-crud/laboratory-domain-crud.component';
import { LaboratoryDomainCreateComponent } from './components/laboratory-domain/laboratory-domain-create/laboratory-domain-create.component';
import { LaboratoryDomainUpdateComponent } from './components/laboratory-domain/laboratory-domain-update/laboratory-domain-update.component';
import { LaboratoryDomainDeleteComponent } from './components/laboratory-domain/laboratory-domain-delete/laboratory-domain-delete.component';
import { LaboratorioCrudComponent } from './views/laboratorio-crud/laboratorio-crud.component';
import { LaboratorioCreateComponent } from './components/laboratorio/laboratorio-create/laboratorio-create.component';
import { LaboratorioUpdateComponent } from './components/laboratorio/laboratorio-update/laboratorio-update.component';
import { LaboratorioDeleteComponent } from './components/laboratorio/laboratorio-delete/laboratorio-delete.component';
import { PacienteCreateComponent } from './components/paciente/paciente-create/paciente-create.component';
import { PacienteUpdateComponent } from './components/paciente/paciente-update/paciente-update.component';
import { PacienteDeleteComponent } from './components/paciente/paciente-delete/paciente-delete.component';
import { RequisicaoCreateComponent } from './components/requisicao/requisicao-create/requisicao-create.component';
import { RequisicaoUpdateComponent } from './components/requisicao/requisicao-update/requisicao-update.component';
import { RequisicaoDeleteComponent } from './components/requisicao/requisicao-delete/requisicao-delete.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { TipoExameCreateComponent } from './components/tipo-exame/tipo-exame-create/tipo-exame-create.component';
import { TipoExameUpdateComponent } from './components/tipo-exame/tipo-exame-update/tipo-exame-update.component';
import { TipoExameDeleteComponent } from './components/tipo-exame/tipo-exame-delete/tipo-exame-delete.component';
import { VersaoExameCreateComponent } from './components/versao-exame/versao-exame-create/versao-exame-create.component';
import { VersaoExameUpdateComponent } from './components/versao-exame/versao-exame-update/versao-exame-update.component';
import { VersaoExameDeleteComponent } from './components/versao-exame/versao-exame-delete/versao-exame-delete.component';
import { MaterialBiologicoCreateComponent } from './components/material-biologico/material-biologico-create/material-biologico-create.component';
import { MaterialBiologicoUpdateComponent } from './components/material-biologico/material-biologico-update/material-biologico-update.component';
import { MaterialBiologicoDeleteComponent } from './components/material-biologico/material-biologico-delete/material-biologico-delete.component';
import { LoteAmostraCreateComponent } from './components/lote-amostra/lote-amostra-create/lote-amostra-create.component';
import { LoteAmostraUpdateComponent } from './components/lote-amostra/lote-amostra-update/lote-amostra-update.component';
import { LoteAmostraDeleteComponent } from './components/lote-amostra/lote-amostra-delete/lote-amostra-delete.component';
import { ExameAmostraCreateComponent } from './components/exame-amostra/exame-amostra-create/exame-amostra-create.component';
import { ExameAmostraUpdateComponent } from './components/exame-amostra/exame-amostra-update/exame-amostra-update.component';
import { ExameAmostraDeleteComponent } from './components/exame-amostra/exame-amostra-delete/exame-amostra-delete.component';
import { ExameCreateComponent } from './components/exame/exame-create/exame-create.component';
import { ExameUpdateComponent } from './components/exame/exame-update/exame-update.component';
import { ExameDeleteComponent } from './components/exame/exame-delete/exame-delete.component';
import { ColetorCreateComponent } from './components/coletor/coletor-create/coletor-create.component';
import { ColetorUpdateComponent } from './components/coletor/coletor-update/coletor-update.component';
import { ColetorDeleteComponent } from './components/coletor/coletor-delete/coletor-delete.component';
import { BandejaAmostraCreateComponent } from './components/bandeja-amostra/bandeja-amostra-create/bandeja-amostra-create.component';
import { BandejaAmostraUpdateComponent } from './components/bandeja-amostra/bandeja-amostra-update/bandeja-amostra-update.component';
import { BandejaAmostraDeleteComponent } from './components/bandeja-amostra/bandeja-amostra-delete/bandeja-amostra-delete.component';
import { BandejaCreateComponent } from './components/bandeja/bandeja-create/bandeja-create.component';
import { BandejaUpdateComponent } from './components/bandeja/bandeja-update/bandeja-update.component';
import { BandejaDeleteComponent } from './components/bandeja/bandeja-delete/bandeja-delete.component';
import { BancadaCreateComponent } from './components/bancada/bancada-create/bancada-create.component';
import { BancadaUpdateComponent } from './components/bancada/bancada-update/bancada-update.component';
import { BancadaDeleteComponent } from './components/bancada/bancada-delete/bancada-delete.component';
import { AmostraCreateComponent } from './components/amostra/amostra-create/amostra-create.component';
import { AmostraUpdateComponent } from './components/amostra/amostra-update/amostra-update.component';
import { AmostraDeleteComponent } from './components/amostra/amostra-delete/amostra-delete.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'senha',
    component: LgSenhaComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'laboratorydomains',
    component: LaboratoryDomainCrudComponent,
  },
  {
    path: 'laboratorydomains/create',
    component: LaboratoryDomainCreateComponent,
  },
  {
    path: 'laboratorydomains/update/:id',
    component: LaboratoryDomainUpdateComponent,
  },
  {
    path: 'laboratorydomains/delete/:id',
    component: LaboratoryDomainDeleteComponent,
  },
  {
    path: 'laboratorios',
    component: LaboratorioCrudComponent,
  },
  {
    path: 'laboratorios/create',
    component: LaboratorioCreateComponent,
  },
  {
    path: 'laboratorios/update/:id',
    component: LaboratorioUpdateComponent,
  },
  {
    path: 'laboratorios/delete/:id',
    component: LaboratorioDeleteComponent,
  },
  {
    path: 'pacientes/read',
    component: PacienteReadComponent,
  },
  {
    path: 'pacientes/show:id',
    component: PacienteReadComponent,
  },
  {
    path: 'pacientes/create',
    component: PacienteCreateComponent,
  },
  {
    path: 'pacientes/update/:id',
    component: PacienteCreateComponent,
  },
  {
    path: 'pacientes/delete/:id',
    component: PacienteDeleteComponent,
  },
  {
    path: 'pacientes/show/:id',
    component: PacienteShowComponent,
  },
  {
    path: 'requisicoes/create',
    component: RequisicaoCreateComponent,
  },
  {
    path: 'requisicoes/update/:id',
    component: RequisicaoUpdateComponent,
  },
  {
    path: 'requisicoes/delete/:id',
    component: RequisicaoDeleteComponent,
  },
  {
    path: 'usuarios/create',
    component: UsuarioCreateComponent,
  },
  {
    path: 'usuarios/read',
    component: UsuarioReadComponent,
  },
  {
    path: 'usuarios/update/:id',
    component: UsuarioUpdateComponent,
  },
  {
    path: 'usuarios/delete/:id',
    component: UsuarioDeleteComponent,
  },
  {
    path: 'tipo-exames/create',
    component: TipoExameCreateComponent,
  },
  {
    path: 'tipo-exames/update/:id',
    component: TipoExameUpdateComponent,
  },
  {
    path: 'tipo-exames/delete/:id',
    component: TipoExameDeleteComponent,
  },
  {
    path: 'versao-exames/create',
    component: VersaoExameCreateComponent,
  },
  {
    path: 'versao-exames/update/:id',
    component: VersaoExameUpdateComponent,
  },
  {
    path: 'versao-exames/delete/:id',
    component: VersaoExameDeleteComponent,
  },
  {
    path: 'material-biologicos/create',
    component: MaterialBiologicoCreateComponent,
  },
  {
    path: 'material-biologicos/update/:id',
    component: MaterialBiologicoUpdateComponent,
  },
  {
    path: 'material-biologicos/delete/:id',
    component: MaterialBiologicoDeleteComponent,
  },
  {
    path: 'lote-amostras/create',
    component: LoteAmostraCreateComponent,
  },
  {
    path: 'lote-amostras/update/:id',
    component: LoteAmostraUpdateComponent,
  },
  {
    path: 'lote-amostras/delete/:id',
    component: LoteAmostraDeleteComponent,
  },
  {
    path: 'exame-amostras/create',
    component: ExameAmostraCreateComponent,
  },
  {
    path: 'exame-amostras/update/:id',
    component: ExameAmostraUpdateComponent,
  },
  {
    path: 'exame-amostras/delete/:id',
    component: ExameAmostraDeleteComponent,
  },
  {
    path: 'exames/create',
    component: ExameCreateComponent,
  },
  {
    path: 'exames/update/:id',
    component: ExameUpdateComponent,
  },
  {
    path: 'exames/delete/:id',
    component: ExameDeleteComponent,
  },
  {
    path: 'coletores/create',
    component: ColetorCreateComponent,
  },
  {
    path: 'coletores/update/:id',
    component: ColetorUpdateComponent,
  },
  {
    path: 'coletores/delete/:id',
    component: ColetorDeleteComponent,
  },
  {
    path: 'bandeja-amostras/create',
    component: BandejaAmostraCreateComponent,
  },
  {
    path: 'bandeja-amostras/update/:id',
    component: BandejaAmostraUpdateComponent,
  },
  {
    path: 'bandeja-amostras/delete/:id',
    component: BandejaAmostraDeleteComponent,
  },
  {
    path: 'bandejas/create',
    component: BandejaCreateComponent,
  },
  {
    path: 'bandejas/update/:id',
    component: BandejaUpdateComponent,
  },
  {
    path: 'bandejas/delete/:id',
    component: BandejaDeleteComponent,
  },
  {
    path: 'bancadas/create',
    component: BancadaCreateComponent,
  },
  {
    path: 'bancadas/update/:id',
    component: BancadaUpdateComponent,
  },
  {
    path: 'bancadas/delete/:id',
    component: BancadaDeleteComponent,
  },
  {
    path: 'amostras/create',
    component: AmostraCreateComponent,
  },
  {
    path: 'amostras/update/:id',
    component: AmostraUpdateComponent,
  },
  {
    path: 'amostras/delete/:id',
    component: AmostraDeleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
