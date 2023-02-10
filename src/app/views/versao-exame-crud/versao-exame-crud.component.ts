import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-versao-exame-crud',
  templateUrl: './versao-exame-crud.component.html',
})
export class VersaoExameCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToVersaoExameCreate(): void {
    this.router.navigate(['/versao-exame/create']);
  }

}
