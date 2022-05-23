import { options } from './../../../app.module';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
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
  formControl = new FormControl();
  autoFilter!: Observable<string[]>;

  Items: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]

  constructor(
    private router: Router,
    private empresaService: EmpresaService,
  ) {
    this.empresa = new Empresa({});
  }

  ngOnInit() {
    this.autoFilter = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.mat_filter(value))
    );
  }

  private mat_filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.Items.filter(option => option.toUpperCase().indexOf(filterValue) === 0);
  }

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
