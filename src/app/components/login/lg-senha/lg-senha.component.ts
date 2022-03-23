import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lg-senha',
  templateUrl: './lg-senha.component.html',
  styleUrls: ['./lg-senha.component.css']
})
export class LgSenhaComponent implements OnInit {
  hide = true;
  serie = 0;
  senha = '';
  constructor() { }

  ngOnInit(): void {
  }

  salveSenha(): void {
    localStorage.setItem('login', this.senha);
    console.log(this.senha);
    console.log(localStorage.getItem('login'));
  }

  
}
