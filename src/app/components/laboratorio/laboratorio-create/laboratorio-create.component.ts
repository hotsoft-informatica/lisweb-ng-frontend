import { LaboratoryDomain } from './../../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import { Laboratorio } from '../../model/laboratorio.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratorioService } from '../../service/laboratorio.service';
@Component({
  selector: 'app-laboratorio-create',
  templateUrl: './laboratorio-create.component.html',
  styleUrls: ['./laboratorio-create.component.css'],
})
export class LaboratorioCreateComponent implements OnInit {
  laboratorio: Laboratorio = new Laboratorio({});
  laboratoryDomains: LaboratoryDomain[] = [];
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private laboratorioService: LaboratorioService,
    private laboratoryDomainService: LaboratoryDomainService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.id > 0) {
      this.load(this.id);
    }
  }

  ngOnInit(): void {
    this.laboratoryDomainService.read().subscribe((laboratoryDomains) => {
      this.laboratoryDomains = laboratoryDomains;
    });
  }

  create(): void {
    if (this.id > 0) {
      this.update();
    } else {
      this.laboratorioService.create(this.laboratorio).subscribe(() => {
        this.laboratorioService.showMessage('Laboratório criado com sucesso!');
        this.router.navigate(['/laboratorios']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/laboratorios']);
  }

  load(id: number): void {
    this.laboratorioService
      .readById(id)
      .subscribe((laboratorio) => {
        this.laboratorio = laboratorio;
      });

    this.laboratoryDomainService
      .read()
      .subscribe((laboratoryDomains) => {
        this.laboratoryDomains = laboratoryDomains;
      });
    }

    update(): void {
      this.laboratorioService.update(this.laboratorio).subscribe(() => {
        this.laboratorioService.showMessage(
          'Laboratório atualizado com sucesso!'
        );
      });
      this.router.navigate(['/laboratorios']);
    }
}
