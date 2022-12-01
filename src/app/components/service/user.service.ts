import { BackendIpService } from './backend-ip.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Query } from './../model/query.model';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = '/users'
  authLoginUrl = '/auth/sign_in';
  authLogoutUrl = '/auth/sign_out';

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
    this.authLoginUrl = backendIpService.getUrl() + this.authLoginUrl;
    this.authLogoutUrl = backendIpService.getUrl() + this.authLogoutUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  login(user: Login): Observable<User> {
    const url = `${this.authLoginUrl}.json`;
    return this.http.post<User>(url, user, {});
  }

  logout(): Observable<User> {
    const url = `${this.authLogoutUrl}.json`;
    return this.http.delete(url);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  read(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  readById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.id}`;
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

    return this.http.get<User[]>(this.baseUrl, {
      params,
    });
  }

  countRegisters(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
