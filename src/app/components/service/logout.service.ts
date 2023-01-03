import { BackendIpService } from './backend-ip.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

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
