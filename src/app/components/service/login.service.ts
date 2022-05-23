import { UsuarioToken } from './../model/usuario-token.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = 'http://127.0.0.1:3010/login';


  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  autenticar(login:string, senha:string): Observable<any> {
    const url = `${this.baseUrl}/${login}`;
    const usuarioToken: UsuarioToken = new UsuarioToken({'login':login, 'senha':senha});
    console.table(usuarioToken);
    return this.http.post<any>(url, usuarioToken);
  }

}
