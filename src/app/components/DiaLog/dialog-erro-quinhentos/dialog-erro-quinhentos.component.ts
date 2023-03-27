import { ErrorInterceptor } from './../../service/error-Interceptor.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-erro-quinhentos',
    templateUrl: './dialog-erro-quinhentos.component.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, RouterLink]
})
export class DialogErroQuinhentosComponent implements OnInit {

  constructor(private errorInterceptor: ErrorInterceptor) { }

  mensagemErro500 =  localStorage.getItem('mensagemErro500') || '';
  statusTextErro500 =  localStorage.getItem('statusTextErro500') || '';
  nameErro500 =  localStorage.getItem('nameErro500') || '';
  ngOnInit(): void {
  }
}
