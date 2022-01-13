import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';

@Component({
  selector: 'app-empresa-update',
  templateUrl: './empresa-update.component.html',
  styleUrls: ['./empresa-update.component.css'],
})
export class EmpresaUpdateComponent implements OnInit {
  empresa!: Empresa;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.empresaService
      .readById(id as unknown as number)
      .subscribe((empresa) => {
        this.empresa = empresa;
      });
  }

  updateEmpresa(): void {
    this.empresaService.update(this.empresa).subscribe(() => {
      this.empresaService.showMessage('Empresa atualizada com sucesso!');
    });
    this.router.navigate(['/empresas']).then(() => {
      window.location.reload();
    });
  }

  cancel(): void {
    this.router.navigate(['/empresas']);
  }
}
