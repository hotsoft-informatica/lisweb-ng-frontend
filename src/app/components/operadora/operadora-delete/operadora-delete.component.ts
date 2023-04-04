import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { Operadora } from './../../model/operadora.model';
import { OperadoraService } from '../../service/operadora.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-operadora-delete',
    templateUrl: './operadora-delete.component.html',
    standalone: true,
    imports: [MatCardModule, NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class OperadoraDeleteComponent implements OnInit {
  operadora: Operadora;
  empresa: Empresa;

  constructor(
    public empresaService: EmpresaService,
    public operadoraService: OperadoraService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.empresa = new Empresa({});
    this.operadora = new Operadora({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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

  deleteOperadora(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.operadoraService
      .readById(this.operadora.id as number)
      .subscribe((operadora) => {
        this.operadora = operadora;
        this.empresaService
          .delete(operadora.empresa_id as number)
          .subscribe(() => { });
      });
    this.operadoraService.delete(this.operadora.id as number).subscribe(
      () => {
      this.operadoraService.showMessage('Operadora excluída com sucesso!');
      this.router.navigate(['/operadoras']).then(() => {
        window.location.reload();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/operadoras']);
  }
}
