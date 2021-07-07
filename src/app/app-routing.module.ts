import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LaboratoryDomainCrudComponent } from './views/laboratory-domain-crud/laboratory-domain-crud.component';
import { LaboratoryDomainCreateComponent } from './components/laboratory-domain/laboratory-domain-create/laboratory-domain-create.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }, {
    path: 'laboratorydomains',
    component: LaboratoryDomainCrudComponent,
  }, {
    path: 'laboratorydomains/create',
    component: LaboratoryDomainCreateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
