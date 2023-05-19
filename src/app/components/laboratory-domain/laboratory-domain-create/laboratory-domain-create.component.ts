import { Component, OnInit } from '@angular/core';
import { LaboratoryDomain } from '../../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
@Component({
    selector: 'app-laboratory-domain-create',
    templateUrl: './laboratory-domain-create.component.html',
    standalone: true,
    imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule]
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
