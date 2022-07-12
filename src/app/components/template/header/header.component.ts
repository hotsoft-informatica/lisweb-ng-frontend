import { UsuarioCreateComponent } from './../../usuario/usuario-create/usuario-create.component';
import { MetodoExameComponent } from './../../metodo-exame/metodo-exame.component';
import { LogoutService } from './../../service/logout.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.routerStr = window.location.href;
  }

  hasRoute(route: string): boolean {
    return this.routerStr.includes(route);
  }

  logout(): void {
    this.logoutService.sair();
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(MetodoExameComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
