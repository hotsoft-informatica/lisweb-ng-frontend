import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequisicaoReadComponent } from '../../components/requisicao/requisicao-read/requisicao-read.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-requisicao-crud',
    templateUrl: './requisicao-crud.component.html',
    standalone: true,
    imports: [MatButtonModule, RequisicaoReadComponent]
})
export class RequisicaoCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToRequisicaoCreate(): void {
    this.router.navigate(['/requisicoes/create']);
  }

}
