import { Component, OnInit } from '@angular/core';
import { ResponsavelTecnico } from '../../model/responsavel-tecnico.model';
import { ResponsavelTecnicoService } from '../../service/responsavel-tecnico.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-responsavel-tecnico-update',
  templateUrl: './responsavel-tecnico-update.component.html',
})
export class ResponsavelTecnicoUpdateComponent implements OnInit {
  responsavelTecnico: ResponsavelTecnico;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private responsavelTecnicoService: ResponsavelTecnicoService
  ) {
    this.responsavelTecnico = new ResponsavelTecnico({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id as unknown as number > 0) {
      this.responsavelTecnicoService
        .readById(id as unknown as number)
        .subscribe((responsavelTecnico) => {
          console.table(responsavelTecnico);
          this.responsavelTecnico = responsavelTecnico;
        });
    }
  }

  updateResponsavelTecnico(): void {
    this.responsavelTecnicoService.update(this.responsavelTecnico).subscribe(() => {
      this.responsavelTecnicoService.showMessage('Responsável técnico atualizado com sucesso!');
    });
    this.router.navigate(['/responsavel_tecnicos']).then(() => {
      window.location.reload();
    });
  }

  cancel(): void {
    this.router.navigate(['/responsavel_tecnicos']);
  }
}
