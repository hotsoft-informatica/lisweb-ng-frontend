import { LaboratoryDomain } from './../../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../../laboratory-domain/laboratory-domain.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Laboratorio } from '../../model/laboratorio.model';
import { LaboratorioService } from '../laboratorio.service';

@Component({
  selector: 'app-laboratorio-update',
  templateUrl: './laboratorio-update.component.html',
  styleUrls: ['./laboratorio-update.component.css'],
})
export class LaboratorioUpdateComponent implements OnInit {
  laboratorio!: Laboratorio;
  laboratoryDomains: LaboratoryDomain[] = [];
  id: any;

  constructor(
    private laboratorioService: LaboratorioService,
    private laboratoryDomainService: LaboratoryDomainService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.load(this.id);
  }

  ngOnInit(): void { }

  load(id: number): void {
    this.laboratorioService
      .readById(id as unknown as number)
      .subscribe((laboratorio) => {
        this.laboratorio = laboratorio;
      });

    this.laboratoryDomainService
      .read()
      .subscribe((laboratoryDomains) => {
        this.laboratoryDomains = laboratoryDomains;
      });
  }

  updateLaboratorio(): void {
    this.laboratorioService.update(this.laboratorio).subscribe(() => {
      this.laboratorioService.showMessage(
        'Laboratório atualizado com sucesso!'
      );
    });
    this.router.navigate(['/laboratorios']);
  }

  cancel(): void {
    this.router.navigate(['/laboratorios']);
  }
}
