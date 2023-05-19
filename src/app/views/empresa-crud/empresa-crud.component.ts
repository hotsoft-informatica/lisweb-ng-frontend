import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'app-empresa-crud',
    templateUrl: './empresa-crud.component.html',
    standalone: true,
    imports: [RouterLink, MatButtonModule]
})
export class EmpresaCrudComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToEmpresaCreate(): void {
    this.router.navigate(['/empresas/create']);
  }
}
