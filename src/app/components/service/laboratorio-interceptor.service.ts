import { User } from '../model/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LaboratorioInterceptor implements HttpInterceptor {
  storage: Storage = window.localStorage;
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = JSON.parse(
      this.storage.getItem('currentUser') as string
    ) as User;
    let superUser = JSON.parse(
      this.storage.getItem('currentSuperUser') as string
    ) as User;

    if (user || superUser) {
      let serie = user?.serie || superUser?.serie;
      console.log(serie);

      let serieReq = request.clone({
        params: request.params.set('serie', serie as unknown as string)
      });
      return next.handle(serieReq);
    } else {
      return next.handle(request);
    }
  }
}
