import { options } from './../../../app.module';
import { Options } from '@popperjs/core';
import { Component, OnInit } from '@angular/core';
import { ResponsavelTecnico } from '../../model/responsavel-tecnico.model';
import { ResponsavelTecnicoService } from '../../service/responsavel-tecnico.service';
import { Router } from '@angular/router';
// import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
@Component({
  selector: 'app-responsavel-tecnico-create',
  templateUrl: './responsavel-tecnico-create.component.html',
  styleUrls: ['./responsavel-tecnico-create.component.css']
})
export class ResponsavelTecnicoCreateComponent implements OnInit {
  responsavelTecnico: ResponsavelTecnico;

  states: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]
  filtered_states: string[] = [];

  constructor(private router: Router, private responsavelTecnicoService: ResponsavelTecnicoService) {
    this.responsavelTecnico = new ResponsavelTecnico({});
  }

  ngOnInit(): void {
    Object.assign(this.filtered_states, this.states);
  }

  doFilter() {
    if (this.responsavelTecnico.uf_conselho) {
      this.filtered_states = this.states.filter(
        state => state.toUpperCase().startsWith((this.responsavelTecnico.uf_conselho as string).toUpperCase())
      );
      console.table(this.filtered_states);
      console.log(this.responsavelTecnico.uf_conselho);
    } else {
      this.filtered_states = this.states;
    }
  }

  createResponsavelTecnico(): void {
    this.responsavelTecnicoService.create(this.responsavelTecnico).subscribe(() => {
      this.responsavelTecnicoService.showMessage('Responsável Técnico criado com sucesso!');
      this.router.navigate(['/responsavel_tecnicos']).then(() => {
        window.location.reload();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/responsavel_tecnicos']);
  }

}
