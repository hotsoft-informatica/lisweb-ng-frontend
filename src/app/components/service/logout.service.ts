import { Router } from '@angular/router';
import { UsuarioToken } from './../model/usuario-token.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { combineLatest } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  baseUrl = '/logout';

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = this.backendIpService.getUrl() + this.baseUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
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
