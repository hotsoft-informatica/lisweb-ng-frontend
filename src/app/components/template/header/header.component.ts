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
    private logoutService: LogoutService) { }

  ngOnInit(): void {
    this.routerStr = window.location.href;
  }

  hasRoute(route: string): boolean {
    return this.routerStr.includes(route);
  }

  logout(): void {
    this.logoutService.sair();
  }
}
