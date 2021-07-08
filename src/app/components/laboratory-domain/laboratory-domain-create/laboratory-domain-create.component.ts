import { Component, OnInit } from '@angular/core';
import { LaboratoryDomainService } from './../laboratory-domain.service';

@Component({
  selector: 'app-laboratory-domain-create',
  templateUrl: './laboratory-domain-create.component.html',
  styleUrls: ['./laboratory-domain-create.component.css'],
})
export class LaboratoryDomainCreateComponent implements OnInit {
  constructor(private laboratoryDomainService: LaboratoryDomainService) { }

  ngOnInit(): void { }

  createLaboratoryDomain(): void {
    this.laboratoryDomainService.showMessage('Operação executada com sucesso!');
  }

  cancel(): void {

  }
}
