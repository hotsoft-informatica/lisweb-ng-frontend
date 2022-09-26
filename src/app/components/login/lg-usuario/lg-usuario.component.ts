import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lg-usuario',
  templateUrl: './lg-usuario.component.html',
  styleUrls: ['./lg-usuario.component.css']
})
export class LgUsuarioComponent implements OnInit {
  hide = true;
  serie = 2001;
  login = '';
  storage: Storage = window.localStorage;
  existeUsuario = false;
  existeEmail = false;
  loginIncorreto = false;
  mensagemErro = '';

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {}

  salveLogin(): void {
    localStorage.setItem('login', this.login);
    let getUsuario = this.usuarioService.readByUsuario(this.login)

    localStorage.setItem('login', this.login);
    let getEmail = this.usuarioService.readByEmail(this.login)

    combineLatest([getUsuario, getEmail])
    .subscribe(result => {
      console.table(result);
      this.existeUsuario = result && result[0] && (result[0].id as number > 0);
      this.existeEmail = result && result[1] && (result[1].id as number > 0);
      if(this.existeUsuario || this.existeEmail){
        this.router.navigate(['/senha']);
      }
      else{
        this.mensagemErro = 'Login inexistente';
        this.loginIncorreto = true;
      }
    })
  }


}

