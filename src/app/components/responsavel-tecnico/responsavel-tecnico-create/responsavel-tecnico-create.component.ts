import { Component, OnInit } from '@angular/core';
import { ResponsavelTecnico } from '../../model/responsavel-tecnico.model';
import { ResponsavelTecnicoService } from '../../service/responsavel-tecnico.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgIf, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
@Component({
    selector: 'app-responsavel-tecnico-create',
    templateUrl: './responsavel-tecnico-create.component.html',
    standalone: true,
    imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, NgIf, MatAutocompleteModule, NgFor, MatOptionModule, MatButtonModule]
})
export class ResponsavelTecnicoCreateComponent implements OnInit {
  responsavelTecnico: ResponsavelTecnico;

  states: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]
  filtered_states: string[] = [];

  constructor(private router: Router,
     private responsavelTecnicoService: ResponsavelTecnicoService) {
    this.responsavelTecnico = new ResponsavelTecnico({});
  }

  ngOnInit(): void {
    Object.assign(this.filtered_states, this.states);
  }

  doFilter() {
    if (this.responsavelTecnico.uf_conselho) {
      this.filtered_states = this.states.filter(
        state => state.toUpperCase().startsWith(
          (this.responsavelTecnico.uf_conselho as string).toUpperCase())
      );
      console.table(this.filtered_states);
    } else {
      this.filtered_states = this.states;
    }
  }

  createResponsavelTecnico(): void {
    this.responsavelTecnicoService.create(
      this.responsavelTecnico).subscribe(() => {
      this.responsavelTecnicoService.showMessage(
        'Responsável Técnico criado com sucesso!');
      this.router.navigate(
        ['/responsavel_tecnicos']).then(() => {
        window.location.reload();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/responsavel_tecnicos']);
  }
}
