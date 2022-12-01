import { DialogErroQuinhentosComponent } from './../DiaLog/dialog-erro-quinhentos/dialog-erro-quinhentos.component';
import { DialogErroAutenticacaoComponent } from './../DiaLog/dialog-erro-autenticacao/dialog-erro-autenticacao.component';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatLegacyDialog as MatDialog, MatLegacyDialogState as MatDialogState } from '@angular/material/legacy-dialog';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog) { }

  erroDesconhecidoDialg() {
    this.dialog.open(DialogErroQuinhentosComponent);
  }

  autorizacaoDialog() {
    const matDialogRef = this.dialog.open(DialogErroAutenticacaoComponent);
    if (matDialogRef.getState() === MatDialogState.OPEN) {
      localStorage.setItem('dialogOpened', "true");
    }
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler):
   Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError((error) => {
      /* TODO: Em retornos do backend, como login
      responder com os codigos de erro apropriados.
      Especialmente ser redirecionar a pagina no backend.
      */
      switch (error.status) {
        case 200:
          break;
        case 401:
          this.autorizacaoDialog();
          break;
        case 500:
          localStorage.setItem('mensagemErro500', error.message);
          localStorage.setItem('statusTextErro500', error.statusText);
          localStorage.setItem('nameErro500', error.name);
          this.erroDesconhecidoDialg();
          break;
      };
      console.table(error);
      return throwError(() => new Error(error));
    }));
  }
}
