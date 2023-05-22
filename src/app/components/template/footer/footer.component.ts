import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    standalone: true,
    imports: [NgIf]
})
export class FooterComponent implements OnInit {
  routerStr = '';

  constructor() { }

  ngOnInit(): void {
    this.routerStr = window.location.href;
  }

  hasRoute(route: string): boolean {
    return this.routerStr.includes(route);
  }
}
