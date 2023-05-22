import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaboratoryDomainReadComponent } from '../../components/laboratory-domain/laboratory-domain-read/laboratory-domain-read.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-laboratory-domain-crud',
    templateUrl: './laboratory-domain-crud.component.html',
    standalone: true,
    imports: [MatButtonModule, LaboratoryDomainReadComponent]
})
export class LaboratoryDomainCrudComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToLaboratoryDomainCreate(): void {
    this.router.navigate(['/laboratorydomains/create']);
  }
}
