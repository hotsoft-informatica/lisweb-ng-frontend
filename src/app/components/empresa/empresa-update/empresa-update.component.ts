import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-empresa-update',
    templateUrl: './empresa-update.component.html',
    standalone: true,
    imports: [MatCardModule, NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class EmpresaUpdateComponent implements OnInit {
  @Input('empresa') empresa: Empresa;
  @Input('fromOperadora') fromOperadora!: boolean;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.empresa = new Empresa({});
    console.table(this.empresa);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.table(id);
    if (id as unknown as number > 0) {
      this.empresaService
        .readById(id as unknown as number)
        .subscribe((empresa) => {
          console.table(empresa);
          this.empresa = empresa;
        });
    }
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
