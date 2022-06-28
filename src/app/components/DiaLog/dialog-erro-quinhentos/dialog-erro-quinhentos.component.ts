import { ErrorInterceptor } from './../../service/error-Interceptor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-erro-quinhentos',
  templateUrl: './dialog-erro-quinhentos.component.html',
  styleUrls: ['./dialog-erro-quinhentos.component.css']
})
export class DialogErroQuinhentosComponent implements OnInit {

  constructor(private errorInterceptor: ErrorInterceptor) { }

  mensagemErro500 =  localStorage.getItem('mensagemErro500') || '';
  statusTextErro500 =  localStorage.getItem('statusTextErro500') || '';
  nameErro500 =  localStorage.getItem('nameErro500') || '';
  ngOnInit(): void {
  }
}
