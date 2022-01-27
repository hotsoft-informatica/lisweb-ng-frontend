import { Component, OnInit } from '@angular/core';
import { Operadora } from '../../model/operadora.model';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { OperadoraService } from '../../service/operadora.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operadora-show',
  templateUrl: './operadora-show.component.html',
  styleUrls: ['./operadora-show.component.css'],
})
export class OperadoraShowComponent implements OnInit {
  operadora!: Operadora;
  empresa!: Empresa;
  id: any;

  constructor(
    private operadoraService: OperadoraService,
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.load(this.id);
  }

  ngOnInit(): void { }

  load(id: number): void {
    this.operadoraService
      .readById(id as unknown as number)
      .subscribe((operadora) => {
        this.operadora = operadora;
      });
  }

  cancel(): void {
    this.router.navigate(['/operadoras']);
  }
}
