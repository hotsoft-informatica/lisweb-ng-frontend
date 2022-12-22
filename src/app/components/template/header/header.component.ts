import { SuperUserService } from '../../service/super-user.service';
import { UserService } from '../../service/user.service';
import { LogoutService } from './../../service/logout.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routerStr = '';

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private logoutService: LogoutService,
    private superUserService: SuperUserService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.routerStr = window.location.href;
  }

  hasRoute(route: string): boolean {
    return this.routerStr.includes(route);
  }

  // logout(): void {
  //   this.logoutService.sair();
  // }

  logout(): void {
    this.logoutService.logout().subscribe(() => {
      this.logoutService.showMessage('Sessão encerrada com sucesso!');
      this.router.navigate(['/']);
    });
  }

  userLogout(): void {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  superUserLogout(): void {
    this.superUserService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
