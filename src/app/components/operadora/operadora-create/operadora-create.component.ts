import { Component, OnInit } from '@angular/core';
import { Operadora } from './../../model/operadora.model';
import { OperadoraService } from '../../service/operadora.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operadora-create',
  templateUrl: './operadora-create.component.html',
  styleUrls: ['./operadora-create.component.css'],
})
export class OperadoraCreateComponent implements OnInit {
  operadora!: Operadora;

  constructor(
    private router: Router,
    private operadoraService: OperadoraService
  ) {
    this.operadora = new Operadora({});
  }

  ngOnInit(): void { }

  createOperadora(): void {
    this.operadoraService.create(this.operadora).subscribe(() => {
      this.operadoraService.showMessage('Operadora criada com sucesso!');
      this.router.navigate(['/operadoras']).then(() => {
        window.location.reload();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/operadoras']);
  }
}
