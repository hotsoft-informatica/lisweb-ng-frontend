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
  laboratoryDomains: LaboratoryDomain[] = [];

  constructor(
    private laboratoryDomainService: LaboratoryDomainService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.laboratoryDomainService.readById(id as unknown as number).subscribe(laboratoryDomainService => {
      this.laboratoryDomains = this.laboratoryDomains;
    });
  }
}
