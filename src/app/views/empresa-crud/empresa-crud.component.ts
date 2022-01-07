import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-empresa-crud',
  templateUrl: './empresa-crud.component.html',
  styleUrls: ['./empresa-crud.component.css'],
})
export class EmpresaCrudComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToRequisicaoCreate(): void {
    this.router.navigate(['/empresas/create']);
  }
}
