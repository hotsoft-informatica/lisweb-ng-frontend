import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css'],
})
export class EmpresaCreateComponent implements OnInit {
  @Input('empresa') empresa: Empresa;
  @Input('fromOperadora') fromOperadora!: boolean;

  constructor(private router: Router, private empresaService: EmpresaService) {
    this.empresa = new Empresa({});
  }

  ngOnInit(): void { }

  createEmpresa(): void {
    this.empresaService.create(this.empresa).subscribe(() => {
      this.empresaService.showMessage('Empresa criada com sucesso!');
      this.router.navigate(['/empresas']).then(() => {
        window.location.reload();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/empresas']);
  }
}