import { BaseService } from './base.service';
import { Injectable, Inject, Injector, Input } from '@angular/core';
import { User } from '../model/user.model';
import { UserLogin } from '../model/login.model';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from './usuario.service';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

export class UserService extends BaseService {
  @Input('usuarios') usuarios: Usuario[] = [];
  id!: number;

  // Rotas customizadas para o crud de user
  indexUrl = '/index_users';
  createUrl = '/create_user';
  createAssocUsuarioLmUrl = '/usuarios_user';
  updateUrl = '/update_user';
  baseUrl = '/users';
  loginUrl = '/users/sign_in';
  logoutUrl = '/users/sign_out';

  storage: Storage = window.localStorage;
  query: Query[] = [];

  constructor(
    @Inject(Injector) public injector: Injector,
    private snackbar: MatSnackBar,
    private usuarioService: UsuarioService,
    public http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    super(injector, http);
    this.indexUrl = backendIpService.getUrl() + this.indexUrl;
    this.createUrl = backendIpService.getUrl() + this.createUrl;
    this.updateUrl = backendIpService.getUrl() + this.updateUrl;
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
    this.loginUrl = backendIpService.getUrl() + this.loginUrl;
    this.logoutUrl = backendIpService.getUrl() + this.logoutUrl;
    this.createAssocUsuarioLmUrl = backendIpService.getUrl() + this.createAssocUsuarioLmUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });

    this.endpoint = 'users'
  }

  login(user: UserLogin): Observable<HttpResponse<any>> {
    const url = `${this.loginUrl}`;
    return this.http.post<User>(url, user, {
      "observe": 'response'
    });
  }

  logout(): Observable<User> {
    const url = `${this.logoutUrl}`;
    return this.http.delete(url);
  }

  create(user: User): Observable<User> {
    console.table(user)
    return this.http.post<User>(this.createUrl, user)
  }

  createUpdateAssocUsuarioLm(user: User, id: number): Observable<Usuario> {
    return this.http.post<Usuario>(
      this.createAssocUsuarioLmUrl + '/' + id, user
    );
  }

  read(): Observable<User[]> {
    return this.http.get<User[]>(this.indexUrl);
  }

  readById(id: number): Observable<User> {
    const url = `${this.updateUrl}/${id}`;
    return this.http.get<User>(url);
  }

  update(user: User): Observable<User> {
    const url = `${this.updateUrl}/${user.id}`;
    return this.http.put<User>(url, user);
  }

  delete(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<User>(url);
  }

  // TODO: Implementar herança
  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 0,
    pageSize: number = 5,
    query: Query[] | null
  ): Observable<User[]> {
    let params = new HttpParams()
      .set('active', active)
      .set('sortOrder', sortOrder)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });
    return this.http.get<User[]>(this.indexUrl, {
      params: params
    });
  }

  countRegisters(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true')
    });
  }
}
