import { LaboratorioService } from '../laboratorio.service';
import { Laboratorio } from '../laboratorio.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratorio-read',
  templateUrl: './laboratorio-read.component.html',
  styleUrls: ['./laboratorio-read.component.css'],
})
export class LaboratorioReadComponent implements OnInit {
  laboratorios: Laboratorio[] = [];
  displayedColumns = ['id', 'nome', 'serie', 'criado_em', 'action'];

  constructor(private laboratorioService: LaboratorioService) { }

  ngOnInit(): void {
    this.laboratorioService.read().subscribe((laboratorios) => {
      this.laboratorios = laboratorios;
    });
  }
}
