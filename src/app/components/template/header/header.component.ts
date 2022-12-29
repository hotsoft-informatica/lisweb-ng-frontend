import { SuperUserService } from '../../service/super-user.service';
import { UserService } from '../../service/user.service';
import { LogoutService } from './../../service/logout.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { SuperUser } from '../../model/super-user.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routerStr = '';
  currentUser: User = new User({});
  currentSuperUser: SuperUser = new User({});

  storage: Storage = window.localStorage;

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

  isLogedIn(): boolean {
    this.currentUser = JSON.parse(
      this.storage.getItem('currentUser') as string
    ) as User;
    this.currentSuperUser = JSON.parse(
      this.storage.getItem('currentSuperUser') as string
    ) as SuperUser;
    if (
      (this.currentUser && this.currentUser.id as number > 0) ||
      (this.currentSuperUser && this.currentSuperUser.id as number > 0)
    ) {
      console.log(this.currentUser && this.currentUser.id as number);
      console.log(this.currentSuperUser && this.currentSuperUser.id as number);
      return true
    } else {
      return false
    }
  }

  logout(): void {
    if (this.currentUser) {
      this.storage.removeItem('currentUser');
    } else if (this.currentSuperUser) {
      this.storage.removeItem('currentSuperUser');
    }

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

  // logout(): void {
  //   this.logoutService.sair();
  // }

}
