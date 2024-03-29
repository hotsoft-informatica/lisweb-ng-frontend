import { ShowSignature } from './../../model/show-signature.model';
import { Component, OnInit } from '@angular/core';
import { ResponsavelTecnico } from '../../model/responsavel-tecnico.model';
import { ResponsavelTecnicoService } from '../../service/responsavel-tecnico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { NgIf, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
@Component({
    selector: 'app-responsavel-tecnico-show',
    templateUrl: './responsavel-tecnico-show.component.html',
    standalone: true,
    imports: [MatCardModule, MatDividerModule, MatButtonModule, MatIconModule, NgIf, DatePipe, SafeUrlPipe]
})
export class ResponsavelTecnicoShowComponent implements OnInit {
  responsavelTecnico: ResponsavelTecnico;
  showSignature: ShowSignature;
  id: any;

  constructor(
    private responsavelTecnicoService: ResponsavelTecnicoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.responsavelTecnico = new ResponsavelTecnico({});
    this.showSignature = new ShowSignature({});
    this.id = this.route.snapshot.paramMap.get('id');
    this.load(this.id);
  }

  ngOnInit(): void { }

  load(id: number): void {
    this.responsavelTecnicoService
      .readById(id as unknown as number)
      .subscribe((responsavelTecnico) => {
        this.responsavelTecnico = responsavelTecnico;
      });
  }

  // https://rxjs.dev/deprecations/subscribe-arguments
  loadSignature(id: number) {
    this.responsavelTecnicoService
      .readSigatureById(id as unknown as number)
      .subscribe({
        next: (signature) => this.showSignature = signature,
        error: (err) => {
          console.warn(err)
          this.showSignature.imagem = undefined;
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/responsavel_tecnicos']);
  }
}
