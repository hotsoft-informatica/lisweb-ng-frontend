import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VersaoExameReadComponent } from '../../components/versao-exame/versao-exame-read/versao-exame-read.component';

@Component({
    selector: 'app-versao-exame-crud',
    templateUrl: './versao-exame-crud.component.html',
    standalone: true,
    imports: [VersaoExameReadComponent]
})
export class VersaoExameCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToVersaoExameCreate(): void {
    this.router.navigate(['/versao-exame/create']);
  }

}
