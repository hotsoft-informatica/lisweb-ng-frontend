import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requisicao-crud',
  templateUrl: './requisicao-crud.component.html',
})
export class RequisicaoCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToRequisicaoCreate(): void {
    this.router.navigate(['/requisicoes/create']);
  }

}
