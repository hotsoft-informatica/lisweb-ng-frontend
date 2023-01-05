import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    @Inject(Injector) public injector: Injector,
    public http: HttpClient) {
    super(injector, http);
    this.endpoint = 'users'
  }

  // TODO: Fazer Login e merge
  login(user: any): Observable<any> {
    console.table(user);
    return new Observable;
  }

  // TODO: Fazer merge
  logout(): Observable<any> {
    return new Observable;
  }
}
