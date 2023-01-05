import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BaseService {
  constructor(
    @Inject(Injector) public injector: Injector,
    public http: HttpClient) {
    super(injector, http);
    this.endpoint = 'usuarios'
  }

  // TODO: Refazer do historico do git
  readByUsuario(user: any): Observable<any> {
    console.table(user);
    return new Observable;
  }

  // TODO: Refazer do historico do git
  readByEmail(user: any): Observable<any> {
    console.table(user);
    return new Observable;
  }
}
