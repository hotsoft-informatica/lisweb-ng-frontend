import { LaboratorioService } from '../../service/laboratorio.service';
import { Laboratorio } from '../../model/laboratorio.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratorio-read',
  templateUrl: './laboratorio-read.component.html',
  styleUrls: ['./laboratorio-read.component.css'],
})
export class LaboratorioReadComponent implements OnInit {
  laboratorios: Laboratorio[] = [];
  displayedColumns = ['id', 'nome', 'laboratory_domain_id', 'serie', 'criado_em', 'action'];

  constructor(private laboratorioService: LaboratorioService) { }

  ngOnInit(): void {
    this.laboratorioService.read().subscribe((laboratorios) => {
      this.laboratorios = laboratorios;
    });
  }
}
