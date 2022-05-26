import { UsuarioToken } from './../model/usuario-token.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  baseUrl = 'http://127.0.0.1:3010/logout';


  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  sair(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get<any>(url);
  }

}
