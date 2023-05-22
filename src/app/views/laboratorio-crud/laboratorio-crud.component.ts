import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaboratorioReadComponent } from '../../components/laboratorio/laboratorio-read/laboratorio-read.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-laboratorio-crud',
    templateUrl: './laboratorio-crud.component.html',
    standalone: true,
    imports: [MatButtonModule, LaboratorioReadComponent]
})
export class LaboratorioCrudComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToLaboratorioCreate(): void {
    this.router.navigate(['/laboratorios/create']);
  }
}
