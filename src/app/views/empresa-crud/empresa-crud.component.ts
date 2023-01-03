import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-empresa-crud',
  templateUrl: './empresa-crud.component.html',
})
export class EmpresaCrudComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToEmpresaCreate(): void {
    this.router.navigate(['/empresas/create']);
  }
}
