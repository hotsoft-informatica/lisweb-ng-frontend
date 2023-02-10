import { Component, OnInit } from '@angular/core';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { Operadora } from './../../model/operadora.model';
import { OperadoraService } from '../../service/operadora.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operadora-update',
  templateUrl: './operadora-update.component.html',
})
export class OperadoraUpdateComponent implements OnInit {
  operadora: Operadora;
  empresas: Empresa[] = [];
  empresa!: Empresa;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private operadoraService: OperadoraService
  ) {
    this.operadora = new Operadora({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.operadoraService
      .readById(id as unknown as number)
      .subscribe((operadora) => {
        this.operadora = operadora;
        this.empresaService.readById(
          this.operadora.empresa_id as number)
                           .subscribe((empresa) => {
          this.empresa ||= empresa;
          console.table(this.empresa);
          this.operadora.empresa = empresa;
        });
      });
  }

  updateOperadora(): void {
    this.operadora.empresa_id = this.empresa.id;
    this.operadora.empresa ||= this.empresa;
    this.empresaService.update(this.empresa).subscribe(
      () => {
      this.operadoraService.showMessage(
        'Empresa atualizada com sucesso!');
      this.operadoraService.update(
        this.operadora).subscribe(() => {
        this.operadoraService.showMessage(
          'Operadora atualizada com sucesso!');
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
