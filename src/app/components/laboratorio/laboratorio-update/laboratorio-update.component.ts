import { LaboratoryDomain } from './../../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Laboratorio } from '../../model/laboratorio.model';
import { LaboratorioService } from '../../service/laboratorio.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-laboratorio-update',
    templateUrl: './laboratorio-update.component.html',
    standalone: true,
    imports: [MatCardModule, NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, NgFor, MatOptionModule, MatDatepickerModule, MatButtonModule]
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
      .subscribe((laboratorio: any) => {
        this.laboratorio = laboratorio;
      });

    this.laboratoryDomainService.read().subscribe((laboratoryDomains: any) => {
      this.laboratoryDomains = laboratoryDomains;
    });
  }

  updateLaboratorio(): void {
    this.laboratorioService.update(this.laboratorio).subscribe(() => {
      this.laboratorioService.showMessage(
        'Laboratório atualizado com sucesso!'
      );
    });
    this.router.navigate(['/laboratorios']).then(() => {
      window.location.reload();
    });
  }

  cancel(): void {
    this.router.navigate(['/laboratorios']);
  }
}

