import { LaboratoryDomain } from './../laboratory-domain.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LaboratoryDomainService } from './../laboratory-domain.service';

@Component({
  selector: 'app-laboratory-domain-create',
  templateUrl: './laboratory-domain-create.component.html',
  styleUrls: ['./laboratory-domain-create.component.css'],
})
export class LaboratoryDomainCreateComponent implements OnInit {
  laboratoryDomain: LaboratoryDomain = {
    name: 'Dominio teste',
    created_at: '' || null,
    updated_at: '' || null,
    version_id: '' || null,
    deleted: '' || null,
    sync_start_date: '' || null,
    sync_deadline: '' || null,
    criado_em: '' || null,
  };

  constructor(
    private laboratoryDomainService: LaboratoryDomainService,
    private router: Router
  ) { }

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
