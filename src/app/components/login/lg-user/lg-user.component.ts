import { UserLogin } from '../../model/login.model';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-lg-user',
  templateUrl: './lg-user.component.html',
  styleUrls: ['./lg-user.component.css']
})
export class LgUserComponent implements OnInit {
  @Input('login') login: UserLogin;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.login = new UserLogin({ "user": {} });
  }

  ngOnInit(): void {
  }

  UserLogin(): void {
    // TODO: Tratar deprecation do subscribe
    this.userService.login(this.login).subscribe(
      (user) => {
        console.log("Arrow function user");
        console.table(user);
      },
      (err) => {
        console.log("Arrow function err")
        console.table(err);
        // TODO: Tratar retornos com erro
        this.userService.showMessage('Usuário logado com sucesso!');
        this.router.navigate(['/']);
      },
      () => {
        console.log("Arrow function Vazio");
        this.userService.showMessage('Usuário logado com sucesso!');
        this.router.navigate(['/']);
      });
  }
}
