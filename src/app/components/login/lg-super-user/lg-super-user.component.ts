import { Router } from '@angular/router';
import { SuperUser } from '../../model/super-user.model';
import { SuperUserLogin } from '../../model/login.model';
import { SuperUserService } from '../../service/super-user.service';
import { Input, Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lg-super-user',
  templateUrl: './lg-super-user.component.html'
})
export class LgSuperUserComponent implements OnInit {
  @Input('login') login: SuperUserLogin = new SuperUserLogin({ "super_user": {} });
  storage: Storage = window.localStorage;

  authForm: FormGroup = new FormGroup({
    email: new FormControl(this.login.super_user.email, [
      Validators.required,
    ]),
    password: new FormControl(this.login.super_user.password, [
      Validators.required,
    ]),
  });
  isSubmitted = false;

  constructor(
    private router: Router,
    private superUserService: SuperUserService
  ) { }

  ngOnInit(): void {
  }

  superUserLogin(): void {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    // TODO: Tratar deprecation do subscribe
    this.superUserService.login(this.login).subscribe(
      (res) => {
        console.log("Arrow function Super User");

        let header: HttpHeaders = res.headers;
        let auth: string = header.get('Authorization') as string;
        let superUser: SuperUser = res.body.status.data as SuperUser;

        localStorage.setItem('Authorization', auth);
        localStorage.setItem('userLoginType', 'superUser');
        localStorage.setItem('currentSuperUser', JSON.stringify(superUser));
      },
      (err) => {
        console.log("Arrow function err")
        console.table(err);
        // TODO: Tratar retornos com erro
        this.superUserService.showMessage('Erro ao efetuar o login!');
        this.router.navigate(['/']);
      },
      () => {
        console.log("Arrow function Vazio");
        this.superUserService.showMessage('Admin logado com sucesso!');
        this.router.navigate(['/']);
      });
  }
}
