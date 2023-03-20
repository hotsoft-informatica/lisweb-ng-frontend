import { BackendIpService } from './backend-ip.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class LogoutService {
  baseUrl = '/logout';
  userLogoutUrl = '/users/sign_out';
  superUserLogoutUrl = '/super_users/sign_out';

  storage: Storage = window.localStorage;

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = this.backendIpService.getUrl() + this.baseUrl;
    this.userLogoutUrl = backendIpService.getUrl() + this.userLogoutUrl;
    this.superUserLogoutUrl = backendIpService.getUrl() + this.superUserLogoutUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  logout(): Observable<any> {
    let logedUserType: string = this.storage.getItem('userLoginType') as string;
    console.log(logedUserType);

    if (logedUserType == 'user') {
      const userUrl = `${this.userLogoutUrl}`;
      return this.http.delete(userUrl);
    }
    else {
      const superUserUrl = `${this.superUserLogoutUrl}`;
      return this.http.delete(superUserUrl);
    }
  }

  sair(redirect: boolean = false): void {
    const url = `${this.baseUrl}`;
    this.http.get<any>(url).subscribe(
      resultado => {
        localStorage.setItem('logado', 'false');
        localStorage.setItem('token', '');
        if (redirect) {
          this.router.navigate(['/login']);
        }
      })
  }
}
