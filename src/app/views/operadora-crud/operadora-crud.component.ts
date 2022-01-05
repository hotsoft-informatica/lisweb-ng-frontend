import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operadora-crud',
  templateUrl: './operadora-crud.component.html',
  styleUrls: ['./operadora-crud.component.css'],
})
export class OperadoraCrudComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToOperadoraCreate(): void {
    this.router.navigate(['/operadoras/create']);
  }
}
