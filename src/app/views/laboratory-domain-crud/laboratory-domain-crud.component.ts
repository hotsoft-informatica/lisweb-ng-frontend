import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laboratory-domain-crud',
  templateUrl: './laboratory-domain-crud.component.html',
})
export class LaboratoryDomainCrudComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToLaboratoryDomainCreate(): void {
    this.router.navigate(['/laboratorydomains/create']);
  }
}
