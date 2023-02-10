import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laboratorio-crud',
  templateUrl: './laboratorio-crud.component.html',
})
export class LaboratorioCrudComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToLaboratorioCreate(): void {
    this.router.navigate(['/laboratorios/create']);
  }
}
