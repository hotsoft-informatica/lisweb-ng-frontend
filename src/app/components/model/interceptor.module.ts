import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../service/interceptor.service';
import { Usuario } from './../model/usuario.model';

@NgModule({
 providers: [

  Interceptor,

  {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  },
 ],
})
export class InterceptorModule {}
