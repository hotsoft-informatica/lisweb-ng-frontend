import { Component, OnInit } from '@angular/core';
import { LaboratoryDomain } from '../../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-laboratory-domain-create',
  templateUrl: './laboratory-domain-create.component.html',
})
export class LaboratoryDomainCreateComponent implements OnInit {
  laboratoryDomain: LaboratoryDomain;

  constructor(
    private router: Router,
    private laboratoryDomainService: LaboratoryDomainService
  ) {
    this.laboratoryDomain = new LaboratoryDomain({});
  }

  ngOnInit(): void { }

  createLaboratoryDomain(): void {
    this.laboratoryDomainService.create(
      this.laboratoryDomain).subscribe(() => {
      this.laboratoryDomainService.showMessage('Domínio criado com sucesso!');
      this.router.navigate(['/laboratorydomains']).then(() => {
        window.location.reload();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/laboratorydomains']);
  }
}
