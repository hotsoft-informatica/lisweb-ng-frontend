import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LaboratoryDomain } from '../laboratory-domain.model';
import { LaboratoryDomainService } from '../laboratory-domain.service';

@Component({
  selector: 'app-laboratory-domain-update',
  templateUrl: './laboratory-domain-update.component.html',
  styleUrls: ['./laboratory-domain-update.component.css'],
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
      .subscribe((laboratoryDomain) => {
        this.laboratoryDomain = laboratoryDomain;
      });
  }

  updateLaboratoryDomain(): void {
    this.laboratoryDomainService.update(this.laboratoryDomain).subscribe(() => {
      this.laboratoryDomainService.showMessage(
        'Domínio atualizado com sucesso!'
      );
    });
    this.router.navigate(['/laboratorydomains']);
  }

  cancel(): void {
    this.router.navigate(['/laboratorydomains']);
  }
}
