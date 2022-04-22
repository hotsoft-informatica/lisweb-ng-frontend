import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpParams }
from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LgUsuarioComponent } from '../login/lg-usuario/lg-usuario.component';
import { LgSenhaComponent } from '../login/lg-senha/lg-senha.component';

@Injectable()

export class Interceptor implements HttpInterceptor {
  storage: Storage = window.localStorage;
  user: String = '';
  password: String = '';
  serie = 2001;

 intercept( request: HttpRequest<any>, next: HttpHandler ):
 Observable<HttpEvent<any>> {

    //TODO: puxar da variavel
    let headers = request.headers;
    const password_str = this.storage.getItem('senha') ? this.storage.getItem('senha') : '';
    const user_str = this.storage.getItem('login') ? this.storage.getItem('login') : '';
    this.password = new String(password_str);
    this.user = new String(user_str);

    if ((this.user.length > 1) && ( this.password.length > 1)){
      headers = headers.append('user', user_str as string)
                       .append('password', password_str as string)
                       .append('serie', this.serie.toString())
    }

    const requestAuth = request.clone({
      headers: headers
    });

    return next.handle(requestAuth);
  }


}
