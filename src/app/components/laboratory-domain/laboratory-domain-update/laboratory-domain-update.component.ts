import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LaboratoryDomain } from '../../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-laboratory-domain-update',
    templateUrl: './laboratory-domain-update.component.html',
    standalone: true,
    imports: [MatCardModule, NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule]
})
export class LaboratoryDomainUpdateComponent implements OnInit {
  laboratoryDomain!: LaboratoryDomain;

  constructor(
    private laboratoryDomainService: LaboratoryDomainService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.laboratoryDomainService
      .readById(id as unknown as number)
      .subscribe((laboratoryDomain: any) => {
        this.laboratoryDomain = laboratoryDomain;
      });
  }

  updateLaboratoryDomain(): void {
    this.laboratoryDomainService.update(this.laboratoryDomain).subscribe(() => {
      this.laboratoryDomainService.showMessage(
        'Domínio atualizado com sucesso!'
      );
    });
    this.router.navigate(['/laboratorydomains']).then(() => {
      window.location.reload();
    });
  }

  cancel(): void {
    this.router.navigate(['/laboratorydomains']);
  }
}

