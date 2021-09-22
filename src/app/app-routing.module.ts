import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LaboratoryDomainCrudComponent } from './views/laboratory-domain-crud/laboratory-domain-crud.component';
import { LaboratoryDomainCreateComponent } from './components/laboratory-domain/laboratory-domain-create/laboratory-domain-create.component';
import { LaboratoryDomainUpdateComponent } from './components/laboratory-domain/laboratory-domain-update/laboratory-domain-update.component';
import { LaboratoryDomainDeleteComponent } from './components/laboratory-domain/laboratory-domain-delete/laboratory-domain-delete.component';
import { LaboratorioCreateComponent } from './components/laboratorio/laboratorio-create/laboratorio-create.component';
import { LaboratorioListComponent } from './components/laboratorio/laboratorio-list/laboratorio-list.component';

const routes: Routes = [
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
    component: LaboratorioListComponent,
  },
  {
    path: 'laboratorios/create',
    component: LaboratorioCreateComponent,
  },
  {
    path: 'laboratorios/update/:id',
    component: LaboratorioCreateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
