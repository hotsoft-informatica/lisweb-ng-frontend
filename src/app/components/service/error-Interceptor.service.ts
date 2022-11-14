import { DialogErroQuinhentosComponent } from './../DiaLog/dialog-erro-quinhentos/dialog-erro-quinhentos.component';
import { DialogErroAutenticacaoComponent } from './../DiaLog/dialog-erro-autenticacao/dialog-erro-autenticacao.component';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { EmptyError, Observable, of, throwError, EMPTY } from 'rxjs';
import { mergeMap, delay, retryWhen } from 'rxjs/operators';
import { catchError, retry, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

// import { ToastrService } from 'ngx-toastr';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

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
  erroDesconhecidoDialg() {
    this.dialog.open(DialogErroQuinhentosComponent);
  }
  autorizacaoDialog() {
    this.dialog.open(DialogErroAutenticacaoComponent);
  }
}
