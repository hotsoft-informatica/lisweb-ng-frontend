import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler):
   Observable<HttpEvent<unknown>> {
    req = req.clone({
      // withCredentials: true
    });
    return next.handle(req);
  }
}
