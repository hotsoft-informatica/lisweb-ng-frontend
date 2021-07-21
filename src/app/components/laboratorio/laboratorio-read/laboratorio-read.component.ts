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
  displayedColumns = [
    'id',
    'nome',
    'access_token',
    'created_at',
    'updated_at',
    'version_counter',
    'serie',
    'next_numero_atendimento',
    'next_numero_orcamento',
    'status',
    'next_numero_baixa',
    'producao_estoque',
    'producao_financeiro',
    'sincronizar',
    'token_nfe',
    'url_nfe',
    'laboratory_domain_id',
    'version_id',
    'deleted',
    'empresa_id',
    'original_id',
    'synchronized',
    'domain_id',
    'criado_em',
    'changed_by_lab_id',
    'sync_deadline',
    'matrix',
  ];

  constructor(private laboratorioService: LaboratorioService) { }

  ngOnInit(): void {
    this.laboratorioService.read().subscribe((laboratorios) => {
      this.laboratorios = laboratorios;
    });
  }
}
