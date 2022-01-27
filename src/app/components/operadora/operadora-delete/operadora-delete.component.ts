import { Component, OnInit } from '@angular/core';
import { Operadora } from './../../model/operadora.model';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { OperadoraService } from '../../service/operadora.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operadora-delete',
  templateUrl: './operadora-delete.component.html',
  styleUrls: ['./operadora-delete.component.css'],
})
export class OperadoraDeleteComponent implements OnInit {
  operadora!: Operadora;
  empresa!: Empresa;

  constructor(
    public operadoraService: OperadoraService,
    public empresaService: EmpresaService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.operadoraService
      .readById(id as unknown as number)
      .subscribe((operadora) => {
        this.operadora = operadora;
      });
  }

  deleteOperadora(): void {
    this.operadoraService.delete(this.operadora.id as number).subscribe(() => {
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
