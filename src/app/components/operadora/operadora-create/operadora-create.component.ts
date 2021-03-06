import { Component, OnInit } from '@angular/core';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { Operadora } from './../../model/operadora.model';
import { OperadoraService } from '../../service/operadora.service';
// import { TNODE } from '@angular/core/src/render3/interfaces/injector';
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
    this.operadora ||= new Operadora({});
    this.empresa ||= new Empresa({});
    this.operadora.empresa = this.empresa;
  }

  ngOnInit(): void {
    this.operadora ||= new Operadora({});
    this.empresa ||= new Empresa({});

    const empresa_id = this.operadora.empresa_id || 0
    if (empresa_id > 0) {
      this.empresaService.readById(this.operadora.empresa_id as number).subscribe((empresa) => {
        this.empresa = empresa;
        this.operadora.empresa = empresa;
      });
    }
  }

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
