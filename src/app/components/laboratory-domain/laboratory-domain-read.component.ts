import { LaboratoryDomainService } from './laboratory-domain.service';
import { LaboratoryDomain } from './laboratory-domain.model';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-laboratory-domain-read',
  templateUrl: './laboratory-domain-read.component.html',
  styleUrls: ['./laboratory-domain.component.css'],
})
export class LaboratoryDomainReadComponent implements OnInit {
  public laboratoryDomains: LaboratoryDomain[] = [];

  displayedColumns = [
    'id',
    'name',
    'created_at',
    'updated_at',
    'version_id',
    'deleted',
    'sync_start_date',
    'sync_deadline',
    'criado_em',
    'laboratorios',
    'action'
  ];

  constructor(private laboratoryDomainService: LaboratoryDomainService) {
    this.laboratoryDomains =  [];
  }

  ngOnInit(): void {
    this.laboratoryDomainService.read().subscribe((laboratoryDomains) => {
      this.laboratoryDomains = laboratoryDomains;
    });
  }
}
