import { Component, OnInit } from '@angular/core';
import { Requisicao } from '../../model/requisicao.model';
import { RequisicaoService } from '../../service/requisicao.service';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-requisicao-show',
  templateUrl: './requisicao-show.component.html',
  styleUrls: ['./requisicao-show.component.css']
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

