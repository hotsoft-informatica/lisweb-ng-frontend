import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsavelTecnicoReadComponent } from '../../components/responsavel-tecnico/responsavel-tecnico-read/responsavel-tecnico-read.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-responsavel-tecnico-crud',
    templateUrl: './responsavel-tecnico-crud.component.html',
    standalone: true,
    imports: [MatButtonModule, ResponsavelTecnicoReadComponent]
})
export class ResponsavelTecnicoCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToResponsavelTecnicoCreate(): void {
    this.router.navigate(['/responsavel_tecnicos/create']);
  }

}
