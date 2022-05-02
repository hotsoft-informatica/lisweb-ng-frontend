import { Component, OnInit } from '@angular/core';
import { ResponsavelTecnico } from '../../model/responsavel-tecnico.model';
import { ResponsavelTecnicoService } from '../../service/responsavel-tecnico.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-responsavel-tecnico-show',
  templateUrl: './responsavel-tecnico-show.component.html',
  styleUrls: ['./responsavel-tecnico-show.component.css']
})
export class ResponsavelTecnicoShowComponent implements OnInit {
  responsavelTecnico: ResponsavelTecnico;
  id: any;

  constructor(
    private responsavelTecnicoService: ResponsavelTecnicoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.responsavelTecnico = new ResponsavelTecnico({});
    this.id = this.route.snapshot.paramMap.get('id');
    this.load(this.id);
  }

  ngOnInit(): void {
  }

  load(id: number): void {
    this.responsavelTecnicoService
      .readById(id as unknown as number)
      .subscribe((responsavelTecnico) => {
        this.responsavelTecnico = responsavelTecnico
      });
  }

  cancel(): void {
    this.router.navigate(['/responsavel_tecnicos']);
  }

}
