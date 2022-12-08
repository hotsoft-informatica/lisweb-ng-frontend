import { SuperUserLogin } from '../../model/login.model';
import { Router } from '@angular/router';
import { SuperUserService } from '../../service/super-user.service';
import { Input, Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-lg-super-user',
  templateUrl: './lg-super-user.component.html',
  styleUrls: ['./lg-super-user.component.css']
})
export class LgSuperUserComponent implements OnInit {
  @Input('login') login: SuperUserLogin;
  storage: Storage = window.localStorage;

  constructor(
    private router: Router,
    private superUserService: SuperUserService
  ) {
    this.login = new SuperUserLogin({ "super_user": {} });
  }

  ngOnInit(): void {
  }

  SuperUserLogin(): void {
    // TODO: Tratar deprecation do subscribe
    this.superUserService.login(this.login).subscribe(
      (res) => {
        console.log("Arrow function user");
        let header: HttpHeaders = res.headers;
        let auth: string = header.get('Authorization') as string;
        localStorage.setItem('Authorization', auth);
      },
      (err) => {
        console.log("Arrow function err")
        console.table(err);
        // TODO: Tratar retornos com erro
        this.superUserService.showMessage('Usuário logado com sucesso!');
        this.router.navigate(['/']);
      },
      () => {
        console.log("Arrow function Vazio");
        this.superUserService.showMessage('Usuário logado com sucesso!');
        this.router.navigate(['/']);
      });
  }

}
