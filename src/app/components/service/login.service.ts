import { BackendIpService } from './backend-ip.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UsuarioToken } from './../model/usuario-token.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = '/login';

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
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

  autenticar(login: string, senha: string): Observable<any> {
    const url = `${this.baseUrl}/${login}`;
    const usuarioToken: UsuarioToken = new UsuarioToken({ 'login': login, 'senha': senha });
    console.table(usuarioToken);
    return this.http.post<any>(url, usuarioToken);
  }
}
