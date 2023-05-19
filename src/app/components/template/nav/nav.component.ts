import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    standalone: true,
    imports: [MatListModule]
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
