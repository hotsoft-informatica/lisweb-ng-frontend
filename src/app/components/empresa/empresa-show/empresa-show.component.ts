import { Component, OnInit } from '@angular/core';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-empresa-show',
    templateUrl: './empresa-show.component.html',
    standalone: true,
    imports: [MatCardModule, MatDividerModule, MatButtonModule, DatePipe]
})
export class EmpresaShowComponent implements OnInit {
  empresa: Empresa;
  id: any;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.empresa = new Empresa({});
    this.id = this.route.snapshot.paramMap.get('id');
    this.load(this.id);
  }

  ngOnInit(): void { }

  load(id: number): void {
    this.empresaService
      .readById(id as unknown as number)
      .subscribe((empresa) => {
        this.empresa = empresa
      });
  }

  cancel(): void {
    this.router.navigate(['/empresas']);
  }
}
