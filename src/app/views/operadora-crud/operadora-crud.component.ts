import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperadoraReadComponent } from '../../components/operadora/operadora-read/operadora-read.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-operadora-crud',
    templateUrl: './operadora-crud.component.html',
    standalone: true,
    imports: [MatButtonModule, OperadoraReadComponent]
})
export class OperadoraCrudComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToOperadoraCreate(): void {
    this.router.navigate(['/operadoras/create']);
  }
}
