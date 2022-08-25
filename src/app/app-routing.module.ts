import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AmostraCreateComponent } from './components/amostra/amostra-create/amostra-create.component';
import { AmostraDeleteComponent } from './components/amostra/amostra-delete/amostra-delete.component';
import { AmostraUpdateComponent } from './components/amostra/amostra-update/amostra-update.component';
import { BackendIpComponent } from './components/config/backend-ip/backend-ip.component';
import { BancadaCreateComponent } from './components/bancada/bancada-create/bancada-create.component';
import { BancadaDeleteComponent } from './components/bancada/bancada-delete/bancada-delete.component';
import { BancadaUpdateComponent } from './components/bancada/bancada-update/bancada-update.component';
import { BandejaAmostraCreateComponent } from './components/bandeja-amostra/bandeja-amostra-create/bandeja-amostra-create.component';
import { BandejaAmostraDeleteComponent } from './components/bandeja-amostra/bandeja-amostra-delete/bandeja-amostra-delete.component';
import { BandejaAmostraUpdateComponent } from './components/bandeja-amostra/bandeja-amostra-update/bandeja-amostra-update.component';
import { BandejaCreateComponent } from './components/bandeja/bandeja-create/bandeja-create.component';
import { BandejaDeleteComponent } from './components/bandeja/bandeja-delete/bandeja-delete.component';
import { BandejaUpdateComponent } from './components/bandeja/bandeja-update/bandeja-update.component';
import { ColetorCreateComponent } from './components/coletor/coletor-create/coletor-create.component';
import { ColetorDeleteComponent } from './components/coletor/coletor-delete/coletor-delete.component';
import { ColetorUpdateComponent } from './components/coletor/coletor-update/coletor-update.component';
import { ConsultaAmostraShowComponent } from './components/consulta-amostra/consulta-amostra-show/consulta-amostra-show.component';
import { EmpresaCreateComponent } from './components/empresa/empresa-create/empresa-create.component';
import { EmpresaCrudComponent } from './views/empresa-crud/empresa-crud.component';
import { EmpresaDeleteComponent } from './components/empresa/empresa-delete/empresa-delete.component';
import { EmpresaShowComponent } from './components/empresa/empresa-show/empresa-show.component';
import { EmpresaUpdateComponent } from './components/empresa/empresa-update/empresa-update.component';
import { ExameAmostraCreateComponent } from './components/exame-amostra/exame-amostra-create/exame-amostra-create.component';
import { ExameAmostraDeleteComponent } from './components/exame-amostra/exame-amostra-delete/exame-amostra-delete.component';
import { ExameAmostraUpdateComponent } from './components/exame-amostra/exame-amostra-update/exame-amostra-update.component';
import { ExameCreateComponent } from './components/exame/exame-create/exame-create.component';
import { ExameDeleteComponent } from './components/exame/exame-delete/exame-delete.component';
import { ExameUpdateComponent } from './components/exame/exame-update/exame-update.component';
import { HomeComponent } from './views/home/home.component';
import { LaboratorioCreateComponent } from './components/laboratorio/laboratorio-create/laboratorio-create.component';
import { LaboratorioCrudComponent } from './views/laboratorio-crud/laboratorio-crud.component';
import { LaboratorioDeleteComponent } from './components/laboratorio/laboratorio-delete/laboratorio-delete.component';
import { LaboratorioUpdateComponent } from './components/laboratorio/laboratorio-update/laboratorio-update.component';
import { LaboratoryDomainCreateComponent } from './components/laboratory-domain/laboratory-domain-create/laboratory-domain-create.component';
import { LaboratoryDomainCrudComponent } from './views/laboratory-domain-crud/laboratory-domain-crud.component';
import { LaboratoryDomainDeleteComponent } from './components/laboratory-domain/laboratory-domain-delete/laboratory-domain-delete.component';
import { LaboratoryDomainUpdateComponent } from './components/laboratory-domain/laboratory-domain-update/laboratory-domain-update.component';
import { LgSenhaComponent } from './components/login/lg-senha/lg-senha.component';
import { LocalDeAtendimentoCreateComponent } from './components/local-de-atendimento/local-de-atendimento-create/local-de-atendimento-create.component';
import { LocalDeAtendimentoReadComponent } from './components/local-de-atendimento/local-de-atendimento-read/local-de-atendimento-read.component';
import { LoginComponent } from './components/login/login.component';
import { LoteAmostraCreateComponent } from './components/lote-amostra/lote-amostra-create/lote-amostra-create.component';
import { LoteAmostraDeleteComponent } from './components/lote-amostra/lote-amostra-delete/lote-amostra-delete.component';
import { LoteAmostraUpdateComponent } from './components/lote-amostra/lote-amostra-update/lote-amostra-update.component';
import { MarcacaoCreateComponent } from './components/marcacao/marcacao-create/marcacao-create.component';
import { MarcacaoDeleteComponent } from './components/marcacao/marcacao-delete/marcacao-delete.component';
import { MarcacaoReadComponent } from './components/marcacao/marcacao-read/marcacao-read.component';
import { MaterialBiologicoCreateComponent } from './components/material-biologico/material-biologico-create/material-biologico-create.component';
import { MaterialBiologicoDeleteComponent } from './components/material-biologico/material-biologico-delete/material-biologico-delete.component';
import { MaterialBiologicoUpdateComponent } from './components/material-biologico/material-biologico-update/material-biologico-update.component';
import { MetodoExameComponent } from './components/metodo-exame/metodo-exame.component';
import { MetodosExamesDeleteComponent } from './components/metodos-exames/metodos-exames-delete/metodos-exames-delete.component';
import { MetodosExamesReadComponent } from './components/metodos-exames/metodos-exames-read/metodos-exames-read.component';
import { OperadoraCreateComponent } from './components/operadora/operadora-create/operadora-create.component';
import { OperadoraCrudComponent } from './views/operadora-crud/operadora-crud.component';
import { OperadoraDeleteComponent } from './components/operadora/operadora-delete/operadora-delete.component';
import { OperadoraShowComponent } from './components/operadora/operadora-show/operadora-show.component';
import { OperadoraUpdateComponent } from './components/operadora/operadora-update/operadora-update.component';
import { PacienteCreateComponent } from './components/paciente/paciente-create/paciente-create.component';
import { PacienteDeleteComponent } from './components/paciente/paciente-delete/paciente-delete.component';
import { PacienteReadComponent } from './components/paciente/paciente-read/paciente-read.component';
import { PacienteShowComponent } from './components/paciente/paciente-show/paciente-show.component';
import { PacienteUpdateComponent } from './components/paciente/paciente-update/paciente-update.component';
import { RequisicaoCreateComponent } from './components/requisicao/requisicao-create/requisicao-create.component';
import { RequisicaoCrudComponent } from './views/requisicao-crud/requisicao-crud.component';
import { RequisicaoDeleteComponent } from './components/requisicao/requisicao-delete/requisicao-delete.component';
import { RequisicaoShowComponent } from './components/requisicao/requisicao-show/requisicao-show.component';
import { RequisicaoUpdateComponent } from './components/requisicao/requisicao-update/requisicao-update.component';
import { ResponsavelTecnicoCreateComponent } from './components/responsavel-tecnico/responsavel-tecnico-create/responsavel-tecnico-create.component';
import { ResponsavelTecnicoCrudComponent } from './views/responsavel-tecnico-crud/responsavel-tecnico-crud.component';
import { ResponsavelTecnicoShowComponent } from './components/responsavel-tecnico/responsavel-tecnico-show/responsavel-tecnico-show.component';
import { ResponsavelTecnicoUpdateComponent } from './components/responsavel-tecnico/responsavel-tecnico-update/responsavel-tecnico-update.component';
import { ResponsavelTecnicoUploadComponent } from './components/responsavel-tecnico/responsavel-tecnico-upload/responsavel-tecnico-upload.component';
import { TipoExameCreateComponent } from './components/tipo-exame/tipo-exame-create/tipo-exame-create.component';
import { TipoExameDeleteComponent } from './components/tipo-exame/tipo-exame-delete/tipo-exame-delete.component';
import { TipoExameUpdateComponent } from './components/tipo-exame/tipo-exame-update/tipo-exame-update.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioReadComponent } from './components/usuario/usuario-read/usuario-read.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { ValorReferenciaCreateComponent } from './components/valor-referencia/valor-referencia-create/valor-referencia-create.component';
import { ValorReferenciaReadComponent } from './components/valor-referencia/valor-referencia-read/valor-referencia-read.component';
import { VersaoExameCreateComponent } from './components/versao-exame/versao-exame-create/versao-exame-create.component';
import { VersaoExameCrudComponent } from './views/versao-exame-crud/versao-exame-crud.component';
import { VersaoExameDeleteComponent } from './components/versao-exame/versao-exame-delete/versao-exame-delete.component';
import { VersaoExameUpdateComponent } from './components/versao-exame/versao-exame-update/versao-exame-update.component';
import { LaboratoryGetFilterUpdateComponent } from './components/laboratory-get-filter/laboratory-get-filter-update/laboratory-get-filter-update.component';
import { LaboratoryGetFilterCreateComponent } from './components/laboratory-get-filter/laboratory-get-filter-create/laboratory-get-filter-create.component';
import { LaboratoryGetFilterDeleteComponent } from './components/laboratory-get-filter/laboratory-get-filter-delete/laboratory-get-filter-delete.component';
import { LaboratoryGetFilterReadComponent } from './components/laboratory-get-filter/laboratory-get-filter-read/laboratory-get-filter-read.component';
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
    path: 'metodos-exames/read',
    component: MetodosExamesReadComponent,
  },
  {
    path: 'metodos-exame/create',
    component: MetodoExameComponent,
  },
  {
    path: 'metodos-exame/update/:id',
    component: MetodoExameComponent,
  },
  {
    path: 'metodos-exames/delete/:id',
    component: MetodosExamesDeleteComponent,
  },
  {
    path: 'pacientes/read',
    component: PacienteReadComponent,
  },
  {
    path: 'pacientes/show/:id',
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
    path: 'requisicoes',
    component: RequisicaoCrudComponent,
  },
  {
    path: 'requisicoes/create',
    component: RequisicaoCreateComponent,
  },
  {
    path: 'requisicoes/show/:id',
    component: RequisicaoShowComponent,
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
    path: 'valores_referencia/read',
    component: ValorReferenciaReadComponent,
  },
  {
    path: 'valores_referencia/create',
    component: ValorReferenciaCreateComponent,
  },
  {
    path: 'valores_referencia/update/:id',
    component: ValorReferenciaCreateComponent,
  },
  {
    path: 'valores_referencia/delete/:id',
    component: ValorReferenciaReadComponent,
  },
  {
    path: 'versao_exames',
    component: VersaoExameCrudComponent,
  },
  {
    path: 'versao_exames/create/:create',
    component: VersaoExameCreateComponent,
  },
  {
    path: 'versao_exames/update/:id/:edit',
    component: VersaoExameCreateComponent,
  },
  {
    path: 'versao_exames/delete/:id',
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
    path: 'marcacoes/read',
    component: MarcacaoReadComponent,
  },
  {
    path: 'marcacoes/create',
    component: MarcacaoCreateComponent,
  },
  {
    path: 'marcacoes/update/:id',
    component: MarcacaoCreateComponent,
  },
  {
    path: 'marcacoes/delete/:id',
    component: MarcacaoDeleteComponent,
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
    path: 'operadoras',
    component: OperadoraCrudComponent,
  },
  {
    path: 'operadoras/create',
    component: OperadoraCreateComponent,
  },
  {
    path: 'operadoras/show/:id',
    component: OperadoraShowComponent,
  },
  {
    path: 'operadoras/update/:id',
    component: OperadoraUpdateComponent,
  },
  {
    path: 'operadoras/delete/:id',
    component: OperadoraDeleteComponent,
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
    path: 'empresas',
    component: EmpresaCrudComponent,
  },
  {
    path: 'empresas/create',
    component: EmpresaCreateComponent,
  },
  {
    path: 'empresas/show/:id',
    component: EmpresaShowComponent,
  },
  {
    path: 'empresas/update/:id',
    component: EmpresaUpdateComponent,
  },
  {
    path: 'empresas/delete/:id',
    component: EmpresaDeleteComponent,
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
  {
    path: 'consulta_amostra_show',
    component: ConsultaAmostraShowComponent,
  },
  {
    path: 'localdeatendimento/create',
    component: LocalDeAtendimentoCreateComponent,
  },
  {
    path: 'localdeatendimento/read',
    component: LocalDeAtendimentoReadComponent,
  },
  {
    path: 'localdeatendimento/update/:id',
    component: LocalDeAtendimentoCreateComponent,
  },
  {
    path: 'localdeatendimento/show/:id',
    component: LocalDeAtendimentoReadComponent,
  },
  {
    path: 'localdeatendimento/delete/:id',
    component: LocalDeAtendimentoReadComponent,
  },
  {
    path: 'upload-file',
    component: UploadFileComponent,
  },
  {
    path: 'responsavel_tecnicos',
    component: ResponsavelTecnicoCrudComponent,
  },
  {
    path: 'responsavel_tecnicos/create',
    component: ResponsavelTecnicoCreateComponent,
  },
  {
    path: 'responsavel_tecnicos/show/:id',
    component: ResponsavelTecnicoShowComponent,
  },
  {
    path: 'responsavel_tecnicos/update/:id',
    component: ResponsavelTecnicoUpdateComponent,
  },
  {
    path: 'responsavel_tecnicos/upload/:id',
    component: ResponsavelTecnicoUploadComponent,
  },
  {
    path: 'responsavel_tecnicos/delete/:id',
    component: EmpresaDeleteComponent,
  },
  {
    path: 'backend_ip/create',
    component: BackendIpComponent,
  },
  {
    path: 'laboratory_get_filters/create',
    component: LaboratoryGetFilterCreateComponent,
  },
  {
    path: 'laboratory_get_filters/update',
    component: LaboratoryGetFilterUpdateComponent,
  },
  {
    path: 'laboratory_get_filters/delete',
    component: LaboratoryGetFilterDeleteComponent,
  },
  {
    path: 'laboratory_get_filters/read',
    component: LaboratoryGetFilterReadComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
