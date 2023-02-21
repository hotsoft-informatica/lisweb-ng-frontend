import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { UserLogin } from '../../model/login.model';
import { UserService } from '../../service/user.service';
import { Input, Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lg-user',
  templateUrl: './lg-user.component.html',
})
export class LgUserComponent implements OnInit {
  @Input('login') login: UserLogin = new UserLogin({ "user": {} });;
  storage: Storage = window.localStorage;
  authForm: FormGroup = new FormGroup({
    email: new FormControl(this.login.user.email, [
      Validators.required,
    ]),
    password: new FormControl(this.login.user.password, [
      Validators.required,
    ]),
  });
  isSubmitted = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  userLogin(): void {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    // TODO: Tratar deprecation do subscribe
    // TODO: Revisar e merge
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

