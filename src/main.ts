import { enableProdMode, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { getPtBrMatPaginatorIntl } from './app/pt-br-mat-paginator-intl';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ErrorInterceptor } from './app/components/service/error-Interceptor.service';
import { LaboratorioInterceptor } from './app/components/service/laboratorio-interceptor.service';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AuthorizationInterceptor } from './app/components/service/authorization-interceptor.service';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, BrowserModule, FormsModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatInputModule, MatListModule, MatMenuModule, MatMomentDateModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTreeModule, ReactiveFormsModule, RouterModule, TranslateModule.forRoot({
            defaultLanguage: 'pt-BR'
        })),
        AuthorizationInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationInterceptor,
            multi: true,
        },
        LaboratorioInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LaboratorioInterceptor,
            multi: true,
        },
        ErrorInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor, // TODO: Revisar 401 combo especialidade medico
            multi: true,
        },
        {
            provide: MatPaginatorIntl,
            useValue: getPtBrMatPaginatorIntl(),
        },
        {
            provide: LOCALE_ID,
            useValue: 'pt-BR',
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .catch(err => console.error(err));
