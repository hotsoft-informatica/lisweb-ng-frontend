import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Laboratorio } from '../../model/laboratorio.model';
import { LaboratorioService } from '../../service/laboratorio.service';

@Component({
  selector: 'app-laboratorio-delete',
  templateUrl: './laboratorio-delete.component.html',
})
export class LaboratorioDeleteComponent implements OnInit {
  laboratorio!: Laboratorio;

  constructor(
    private laboratorioService: LaboratorioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.laboratorioService
      .readById(id as unknown as number)
      .subscribe((laboratorio) => {
        this.laboratorio = laboratorio;
      });
  }

  deleteLaboratorio(): void {
    this.laboratorioService
      .delete(this.laboratorio.id as number)
      .subscribe(() => {
        this.laboratorioService.showMessage(
          'Laboratório excluído com sucesso!'
        );
        this.router.navigate(['/laboratorios']).then(() => {
          window.location.reload();
        });
      });
  }

  cancel(): void {
    this.router.navigate(['/laboratorios']);
  }

}
