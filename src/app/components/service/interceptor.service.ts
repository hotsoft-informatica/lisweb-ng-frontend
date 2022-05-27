import { LogoutService } from './logout.service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpParams }
from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class Interceptor implements HttpInterceptor {
  storage: Storage = window.localStorage;
  user: String = '';
  password: String = '';
  token: String = '';
  serie = 2001;

  constructor(private logoutService: LogoutService) { }


 intercept( request: HttpRequest<any>, next: HttpHandler ):
 Observable<HttpEvent<any>> {

    //TODO: puxar da variavel
    let headers = request.headers;
    const password_str = this.storage.getItem('senha') ? this.storage.getItem('senha') : '';
    const user_str = this.storage.getItem('login') ? this.storage.getItem('login') : '';
    const token_str = this.storage.getItem('token') ? this.storage.getItem('token') : '';
    this.password = new String(password_str);
    this.user = new String(user_str);
    console.table(this.storage.getItem('token'));
    this.token = new String(token_str);

    const timeout = new Date(this.storage.getItem('timeoutAngular') as string);
    const timeoutnow = new Date();
    const logado = this.storage.getItem('logado');

    if((logado == 'true') && (timeout <= timeoutnow)){
      this.logoutService.sair();
    }

    if(this.token.length > 1){
      headers = headers.append('token', token_str as string)
      console.log('Autorizado por token');
      console.table(token_str);
    }
    else {
      if ((this.user.length > 1) && ( this.password.length > 1)){
        headers = headers.append('user', user_str as string)
                        .append('password', password_str as string)
                        .append('serie', this.serie.toString())
      }
      console.log(this.token)
    }
    const requestAuth = request.clone({
      headers: headers
    });
    return next.handle(requestAuth);
 }
}

