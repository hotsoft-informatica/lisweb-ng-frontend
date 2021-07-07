import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratory-domain-create',
  templateUrl: './laboratory-domain-create.component.html',
  styleUrls: ['./laboratory-domain-create.component.css'],
})
export class LaboratoryDomainCreateComponent implements OnInit {
  atributoTeste = 'Testando';

  constructor() { }

  ngOnInit(): void { }

  fazerAlgo(): void {
    console.log('fazendo algo!!!');
  }
}
