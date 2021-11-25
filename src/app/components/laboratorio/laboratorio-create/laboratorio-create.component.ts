import { LaboratoryDomain } from './../../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import { Laboratorio } from '../../model/laboratorio.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaboratorioService } from '../../service/laboratorio.service';
import { STRING_TYPE } from '@angular/compiler';


@Component({
  selector: 'app-laboratorio-create',
  templateUrl: './laboratorio-create.component.html',
  styleUrls: ['./laboratorio-create.component.css'],
})
export class LaboratorioCreateComponent implements OnInit {
  laboratorio: Laboratorio;
  laboratoryDomains: LaboratoryDomain[] = [];

  constructor(
    private router: Router,
    private laboratorioService: LaboratorioService,
    private laboratoryDomainService: LaboratoryDomainService
  ) {
    this.laboratorio = new Laboratorio({});
  }

  ngOnInit(): void {
    this.laboratoryDomainService.read().subscribe((laboratoryDomains) => {
      this.laboratoryDomains = laboratoryDomains;
    });
  }

  createLaboratorio(): void {
    this.laboratorioService.create(this.laboratorio).subscribe(() => {
      this.laboratorioService.showMessage('Laboratório criado com sucesso!');
      this.router.navigate(['/laboratorios']).then(() => {
        window.location.reload();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/laboratorios']);
  }
}
