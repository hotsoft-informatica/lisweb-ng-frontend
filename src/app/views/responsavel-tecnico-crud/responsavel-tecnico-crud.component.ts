import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsavel-tecnico-crud',
  templateUrl: './responsavel-tecnico-crud.component.html',
  styleUrls: ['./responsavel-tecnico-crud.component.css']
})
export class ResponsavelTecnicoCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToResponsavelTecnicoCreate(): void {
    this.router.navigate(['/responsavel_tecnicos/create']);
  }

}
