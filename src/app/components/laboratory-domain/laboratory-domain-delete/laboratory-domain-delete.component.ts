import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoryDomain } from '../../model/laboratory-domain.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratory-domain-delete',
  templateUrl: './laboratory-domain-delete.component.html',
  styleUrls: ['./laboratory-domain-delete.component.css'],
})
export class LaboratoryDomainDeleteComponent implements OnInit {
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

  deleteLaboratoryDomain(): void {
    this.laboratoryDomainService
      .delete(this.laboratoryDomain.id as number)
      .subscribe(() => {
        this.laboratoryDomainService.showMessage(
          'Domínio excluído com sucesso!'
        );
        this.router.navigate(['/laboratorydomains']);
      });
  }

  cancel(): void {
    this.router.navigate(['/laboratorydomains']);
  }
}
