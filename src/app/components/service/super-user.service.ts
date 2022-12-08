import { SuperUser } from '../model/super-user.model';
import { Login } from '../model/login.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { BackendIpService } from './backend-ip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SuperUserService {
  baseUrl = '/super_users'
  logInUrl = '/super_users/sign_in';
  logOutUrl = '/super_users/sign_out';

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
    this.logInUrl = backendIpService.getUrl() + this.logInUrl;
    this.logOutUrl = backendIpService.getUrl() + this.logOutUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  login(super_user: Login): Observable<SuperUser> {
    const url = `${this.logInUrl}.json`;
    return this.http.post<SuperUser>(url, super_user);
  }

  logout(): Observable<SuperUser> {
    const url = `${this.logOutUrl}.json`;
    return this.http.delete(url);
  }

  create(super_user: SuperUser): Observable<SuperUser> {
    return this.http.post<SuperUser>(this.baseUrl, super_user);
  }

  read(): Observable<SuperUser[]> {
    return this.http.get<SuperUser[]>(this.baseUrl);
  }

  readById(id: number): Observable<SuperUser> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<SuperUser>(url);
  }

  update(super_user: SuperUser): Observable<SuperUser> {
    const url = `${this.baseUrl}/${super_user.id}`;
    return this.http.put<SuperUser>(url, super_user);
  }

  delete(id: number): Observable<SuperUser> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<SuperUser>(url);
  }

  find(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<SuperUser[]> {
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

    return this.http.get<SuperUser[]>(this.baseUrl, {
      params,
    });
  }

  countRegisters(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
