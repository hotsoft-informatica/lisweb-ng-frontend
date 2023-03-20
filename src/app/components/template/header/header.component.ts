import { Component, OnInit } from '@angular/core';
import { LogoutService } from './../../service/logout.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MetodoExameComponent } from './../../metodo-exame/metodo-exame.component';
import { Router } from '@angular/router';
import { SuperUserService } from '../../service/super-user.service';
import { UserService } from '../../service/user.service';
import { SuperUser } from '../../model/super-user.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  routerStr = '';
  logged: boolean = false;
  currentUser: User = new User({});
  currentSuperUser: SuperUser = new User({});
  storage: Storage = window.localStorage;

  constructor(private router: Router,
    private logoutService: LogoutService,
    public dialog: MatDialog,
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
    try {
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
        this.logged = true;
      } else {
        this.logged = false;
      }
    } catch (e) {
      this.logged = false;
      console.error('Problema com os dados do usuario');
      console.error(e);
    }
    return this.logged;
  }

  logout(): void {
    if (this.currentUser) {
      this.storage.removeItem('currentUser');
    }
    else if (this.currentSuperUser) {
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

  openDialogCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      width: '750px',
    }
    const dialogRef = this.dialog.open(MetodoExameComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {});
  }

  superUserLogout(): void {
    this.superUserService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

