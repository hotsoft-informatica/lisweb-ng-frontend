import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Authorization } from './components/service/authorization.service';

@NgModule({
  providers: [
    Authorization,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Authorization,
      multi: true,
    },
  ],
})
export class AuthorizationModule { }
