import { Component, OnInit } from '@angular/core';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { Operadora } from './../../model/operadora.model';
import { OperadoraService } from '../../service/operadora.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operadora-create',
  templateUrl: './operadora-create.component.html',
  styleUrls: ['./operadora-create.component.css'],
})
export class OperadoraCreateComponent implements OnInit {
  operadora: Operadora;
  empresa: Empresa;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private operadoraService: OperadoraService
  ) {
    this.operadora = new Operadora({});
    this.empresa ||= new Empresa({});
  }

  ngOnInit(): void { }

  createOperadora(): void {
    this.empresaService.create(this.empresa).subscribe((empresa) => {
      this.operadora.empresa_id = empresa.id;
      this.operadora.empresa = empresa;
      this.operadoraService.create(this.operadora).subscribe(() => {
        this.operadoraService.showMessage('Operadora criada com sucesso!');
        this.router.navigate(['/operadoras']).then(() => {
          window.location.reload();
        });
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/operadoras']);
  }
}