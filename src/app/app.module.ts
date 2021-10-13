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
  ],
  imports: [
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
