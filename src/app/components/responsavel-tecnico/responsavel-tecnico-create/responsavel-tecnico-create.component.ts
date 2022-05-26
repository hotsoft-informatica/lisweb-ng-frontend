import { Component, OnInit } from '@angular/core';
import { ResponsavelTecnico } from '../../model/responsavel-tecnico.model';
import { ResponsavelTecnicoService } from '../../service/responsavel-tecnico.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-responsavel-tecnico-create',
  templateUrl: './responsavel-tecnico-create.component.html',
  styleUrls: ['./responsavel-tecnico-create.component.css']
})
export class ResponsavelTecnicoCreateComponent implements OnInit {
  responsavelTecnico: ResponsavelTecnico;

  constructor(private router: Router, private responsavelTecnicoService: ResponsavelTecnicoService) {
    this.responsavelTecnico = new ResponsavelTecnico({});
  }

  ngOnInit(): void {
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
