import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empresa-delete',
  templateUrl: './empresa-delete.component.html',
  styleUrls: ['./empresa-delete.component.css'],
})
export class EmpresaDeleteComponent implements OnInit {
  @Input('empresa') empresa: Empresa;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.empresa = new Empresa({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.empresaService
      .readById(id as unknown as number)
      .subscribe((empresa) => {
        this.empresa = empresa;
      });
  }

  deleteEmpresa(): void {
    this.empresaService.delete(this.empresa.id as number).subscribe(() => {
      this.empresaService
        .showMessage(
          'Empresa excluída com sucesso!'
        );
      this.router
        .navigate(['/empresas']).then(() => {
          window.location.reload();
        });
    });
  }

  cancel(): void {
    this.router.navigate(['/empresas']);
  }
}
