import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { UserService } from '../../service/user.service';
import { LogoutService } from './../../service/logout.service';
import { MetodoExameComponent } from './../../metodo-exame/metodo-exame.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routerStr = '';

  constructor(private router: Router,
    private logoutService: LogoutService,
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.routerStr = window.location.href;
  }

  hasRoute(route: string): boolean {
    return this.routerStr.includes(route);
  }

  logout(): void {
    this.logoutService.sair();
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
}
