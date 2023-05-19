import { Component, OnInit } from '@angular/core';
import { Requisicao } from '../../model/requisicao.model';
import { RequisicaoService } from '../../service/requisicao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-requisicao-show',
    templateUrl: './requisicao-show.component.html',
    standalone: true,
    imports: [MatCardModule, MatDividerModule, DatePipe]
})
export class RequisicaoShowComponent implements OnInit {

  requisicao!: Requisicao;

  id: any;

  constructor(
    private requisicaoService: RequisicaoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.load(this.id);
  }

  ngOnInit(): void { }

  load(id: number): void {
    this.requisicaoService
      .readById(id as unknown as number)
      .subscribe((requisicao) => {
        this.requisicao = requisicao;
      });
  }

  cancel(): void {
    this.router.navigate(['/laboratorios']);
  }
}

