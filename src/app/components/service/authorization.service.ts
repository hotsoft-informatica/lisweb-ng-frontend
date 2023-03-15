import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

@Injectable()

export class Authorization implements HttpInterceptor {
  storage: Storage = window.localStorage;

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const res = 'sign_in';

    let auth: string = this.storage.getItem('Authorization') as string;

    if (request.url.search(res) === -1) {
      let authReq = request.clone({
        headers: request.headers.set('Authorization', auth)
      });
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }
  }
}
