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

 intercept( request: HttpRequest<any>, next: HttpHandler ):
 Observable<HttpEvent<any>> {

  console.log(request);

  const requestAuth = request.clone({
    headers: request.headers.append('user', 'arthurpas')
                            .append('password', 'isa140198')
                            .append('serie', '2001')
  });

  return next.handle(requestAuth);
 }

}
