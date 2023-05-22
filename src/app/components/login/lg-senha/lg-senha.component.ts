import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-lg-senha',
    templateUrl: './lg-senha.component.html',
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, RouterLink, NgIf]
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
    const usuario = localStorage.getItem('login') || '';

    let timeoutAng = new Date();

    localStorage.setItem('token', '');
    localStorage.setItem('senha', this.senha);

    this.loginService.autenticar(usuario, this.senha).subscribe(
      resultado => {
        localStorage.setItem('login', '');
        localStorage.setItem('senha', '');
        localStorage.setItem('token', resultado['token']);
        localStorage.setItem('timeout', resultado['timeout']);
        localStorage.setItem('timeoutAngular', timeoutAng.toString());
        console.table(resultado);
        localStorage.setItem('logado', 'true');
        this.router.navigate(['/']);
      },
      erro => {
        this.mensagemErro = 'Senha incorreta';
        this.senhaIncorreta = true;
      }
    )
  }
}
