import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-licenca',
    templateUrl: './licenca.component.html',
    standalone: true,
    imports: [MatIconModule, NgFor]
})
export class LicencaComponent {
  arrayA: String[] = ["a", "b", "c", "d", "e"];
  license: {} = {
    "data": '2023-01-19',
    "serie": "2001",
    "liberacao": "56465465465"
  }
  constructor(
  ) {}
}
