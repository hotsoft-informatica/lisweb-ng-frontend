import { UserLogin } from '../../model/login.model';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Input, Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../model/user.model';
@Component({
  selector: 'app-lg-user',
  templateUrl: './lg-user.component.html',
  styleUrls: ['./lg-user.component.css']
})
export class LgUserComponent implements OnInit {
  @Input('login') login: UserLogin;
  storage: Storage = window.localStorage;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.login = new UserLogin({ "user": {} });
  }

  ngOnInit(): void {
  }

  userLogin(): void {
    // TODO: Tratar deprecation do subscribe
    this.userService.login(this.login).subscribe(
      (res) => {
        console.log("Arrow function user");

        let header: HttpHeaders = res.headers;
        let auth: string = header.get('Authorization') as string;
        let user: User = res.body.status.data as User;

        localStorage.setItem('Authorization', auth);
        localStorage.setItem('userLoginType', 'user');
        localStorage.setItem('currentUser', JSON.stringify(user));
      },
      (err) => {
        console.log("Arrow function err")
        console.table(err);
        // TODO: Tratar retornos com erro
        this.userService.showMessage('Erro ao efetuar o login!');
        this.router.navigate(['/']);
      },
      () => {
        console.log("Arrow function Vazio");
        this.userService.showMessage('Usuário logado com sucesso!');
        this.router.navigate(['/']);
      });
  }

}
