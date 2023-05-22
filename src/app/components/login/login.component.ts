import { Component, OnInit } from '@angular/core';
import { LgUsuarioComponent } from './lg-usuario/lg-usuario.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [LgUsuarioComponent]
})
export class LoginComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
