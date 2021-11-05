import { LaboratoryDomain } from './laboratory-domain.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LaboratoryDomainService } from './laboratory-domain.service';
import { Moment } from 'moment';
@Component({
  selector: 'app-laboratory-domain-create',
  templateUrl: './laboratory-domain-create.component.html',
  styleUrls: ['./laboratory-domain.component.css'],
})
export class LaboratoryDomainCreateComponent implements OnInit {
  public laboratoryDomain: LaboratoryDomain;

  constructor(
    private laboratoryDomainService: LaboratoryDomainService,
    private router: Router,
    laboratoryDomain: LaboratoryDomain
  ) {
    this.laboratoryDomain = new LaboratoryDomain({});
  }

  ngOnInit(): void { }

  createLaboratoryDomain(): void {
    this.laboratoryDomainService.create(this.laboratoryDomain).subscribe(() => {
      this.laboratoryDomainService.showMessage('Domínio criado com sucesso!');
      this.router.navigate(['/laboratorydomains']);
    });
  }

  cancel(): void {
    this.router.navigate(['/laboratorydomains']);
  }
}
