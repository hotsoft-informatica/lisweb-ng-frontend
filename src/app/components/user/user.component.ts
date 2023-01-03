import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  canExit(): boolean {
    if (confirm("Você quer sair da rota?")) {
      return true;
    } else {
      return false;
    }
  }

}
