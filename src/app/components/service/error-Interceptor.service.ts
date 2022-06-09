import { DialogErroAutenticacaoComponent } from './../DiaLog/dialog-erro-autenticacao/dialog-erro-autenticacao.component';
import {Injectable} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import {EmptyError, Observable, of, throwError, EMPTY} from 'rxjs';
import {mergeMap, delay, retryWhen} from 'rxjs/operators';
import { catchError, retry, tap } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
// import { ToastrService } from 'ngx-toastr';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError((error) => {
        switch (error.status){
          case 401:
            this.autorizacaoDialog();
            break;
          case 500:
            console.log('Error desconhecido');
            break;
        };
        console.table(error);
        return throwError(() => new Error(error));
    }));
  }
 autorizacaoDialog(){
  this.dialog.open(DialogErroAutenticacaoComponent);
 }
}
