import { LaboratoryDomainService } from './../laboratory-domain.service';
import { LaboratoryDomain } from './../laboratory-domain.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-laboratory-domain-read',
  templateUrl: './laboratory-domain-read.component.html',
  styleUrls: ['./laboratory-domain-read.component.css'],
})
export class LaboratoryDomainReadComponent implements AfterViewInit, OnInit {
  laboratoryDomains: LaboratoryDomain[] = [];
  table: any;
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
  ];

  constructor(private laboratoryDomainService: LaboratoryDomainService) { }

  ngOnInit(): void {
    this.laboratoryDomainService.read().subscribe((laboratoryDomains) => {
      this.laboratoryDomains = laboratoryDomains;
      console.log(laboratoryDomains);
    });
  }

  ngAfterViewInit() {
    this.table.laboratoryDomains = this.laboratoryDomains;
  }
}
