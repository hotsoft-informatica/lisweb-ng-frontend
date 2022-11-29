import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '../service/error-Interceptor.service';

@NgModule({
 providers: [
  ErrorInterceptor,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
 ],
})
export class ErroInterceptorModule {}
