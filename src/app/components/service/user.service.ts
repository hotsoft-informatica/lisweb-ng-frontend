import { User } from '../model/user.model';
import { UserLogin } from '../model/login.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { BackendIpService } from './backend-ip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Rotas customizadas para o crud de user
  indexUrl = '/index_users';
  createUrl = '/create_user';
  updateUrl = '/update_user';

  baseUrl = '/users'
  loginUrl = '/users/sign_in';
  logoutUrl = '/users/sign_out';

  storage: Storage = window.localStorage;

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.indexUrl = backendIpService.getUrl() + this.indexUrl;
    this.createUrl = backendIpService.getUrl() + this.createUrl;
    this.updateUrl = backendIpService.getUrl() + this.updateUrl;
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
    this.loginUrl = backendIpService.getUrl() + this.loginUrl;
    this.logoutUrl = backendIpService.getUrl() + this.logoutUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  login(user: UserLogin): Observable<HttpResponse<any>> {
    const url = `${this.loginUrl}`;
    return this.http.post<User>(url, user, {
      "observe": 'response'
    });
  }

  logout(): Observable<User> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

    const url = `${this.logoutUrl}`;
    return this.http.delete(url, { headers: headers });
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.createUrl, user);
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

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
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
      params,
    });
  }

  countRegisters(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
