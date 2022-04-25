import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lg-senha',
  templateUrl: './lg-senha.component.html',
  styleUrls: ['./lg-senha.component.css']
})
export class LgSenhaComponent implements OnInit {
  hide = true;
  serie = 2001;
  senha = '';
  storage: Storage = window.localStorage;
  senhaCorresp = '';
  mensagemErro = '';
  senhaIncorreta = false;


  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit(): void {
  }

  salveSenha(): void {
    localStorage.setItem('senha', this.senha);
    const usuario = localStorage.getItem('login') || '';
    const token = localStorage.getItem('token') || '';
    this.loginService.autenticar(usuario, this.senha, token).subscribe(
      resultado => {
        this.router.navigate(['/']);
      },
      erro => {
        this.mensagemErro = 'Senha incorreta';
        this.senhaIncorreta = true;
      }
    )
  }
}
