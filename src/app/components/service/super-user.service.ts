import { SuperUser } from '../model/super-user.model';
import { SuperUserLogin } from '../model/login.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { BackendIpService } from './backend-ip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SuperUserService {
  baseUrl = '/super_users'
  logInUrl = '/super_users/sign_in';
  logOutUrl = '/super_users/sign_out';

  storage: Storage = window.localStorage;

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

  login(superUser: SuperUserLogin): Observable<HttpResponse<any>> {
    const url = `${this.logInUrl}`;
    return this.http.post<SuperUser>(url, superUser, {
      "observe": 'response'
    });
  }

  logout(): Observable<SuperUser> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let authJson = JSON.parse(auth);
    let headers = new HttpHeaders().set('Authorization', authJson);

    const url = `${this.logOutUrl}`;
    return this.http.delete(url, { headers: headers });
  }

  create(superUser: SuperUser): Observable<SuperUser> {
    return this.http.post<SuperUser>(this.baseUrl, superUser);
  }

  read(): Observable<SuperUser[]> {
    return this.http.get<SuperUser[]>(this.baseUrl);
  }

  readById(id: number): Observable<SuperUser> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<SuperUser>(url);
  }

  update(superUser: SuperUser): Observable<SuperUser> {
    const url = `${this.baseUrl}/${superUser.id}`;
    return this.http.put<SuperUser>(url, superUser);
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
