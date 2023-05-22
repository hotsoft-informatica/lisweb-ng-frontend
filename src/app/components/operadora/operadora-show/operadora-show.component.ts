import { Component, OnInit } from '@angular/core';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { Operadora } from '../../model/operadora.model';
import { OperadoraService } from '../../service/operadora.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-operadora-show',
    templateUrl: './operadora-show.component.html',
    standalone: true,
    imports: [MatCardModule, MatDividerModule, MatButtonModule, DatePipe]
})
export class OperadoraShowComponent implements OnInit {
  operadora: Operadora;
  empresa: Empresa;
  id: any;

  constructor(
    private operadoraService: OperadoraService,
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.empresa = new Empresa({});
    this.operadora = new Operadora({});
    this.id = this.route.snapshot.paramMap.get('id');
    this.load(this.id);
  }

  ngOnInit(): void { }

  load(id: number): void {
    this.operadoraService
      .readById(id as unknown as number)
      .subscribe((operadora) => {
        this.operadora = operadora;
        this.empresaService
          .readById(this.operadora.empresa_id as number)
          .subscribe((empresa) => {
            this.empresa = empresa;
            this.operadora.empresa = empresa;
          });
      });
  }

  cancel(): void {
    this.router.navigate(['/operadoras']);
  }
}
