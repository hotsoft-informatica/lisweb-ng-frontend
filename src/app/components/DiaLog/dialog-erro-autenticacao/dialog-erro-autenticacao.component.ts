import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-erro-autenticacao',
    templateUrl: './dialog-erro-autenticacao.component.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, RouterLink]
})
export class DialogErroAutenticacaoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
