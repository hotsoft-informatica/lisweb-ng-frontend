import { combineLatest } from 'rxjs';
import { Usuario } from './../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap,map } from 'rxjs/operators';

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

  constructor(private usuarioService: UsuarioService,
              private router: Router,) { }

  ngOnInit(): void {}

  salveLogin(): void {
    localStorage.setItem('login', this.login);
    let getUsuario = this.usuarioService.readByUsuario(this.login)

    localStorage.setItem('login', this.login);
    let getEmail = this.usuarioService.readByEmail(this.login)

    combineLatest([getUsuario, getEmail])
    .subscribe(result => {
      this.existeUsuario = (result[0].id as number > 0);
      this.existeEmail = (result[1].id as number > 0);
      console.log(this.existeUsuario);
      console.log(this.existeEmail);
      if(this.existeUsuario || this.existeEmail){
        this.router.navigate(['/senha']);
      }
      else{
        console.log('erro, usuario nao econtroado');
      }
    })

  }
}

