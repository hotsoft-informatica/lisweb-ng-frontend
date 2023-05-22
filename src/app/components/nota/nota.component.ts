import { BaseComponent } from '../base/base.component';
import { Inject, Injector } from '@angular/core';

import {
  Component,
} from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
@Component({
    selector: 'app-nota',
    templateUrl: './nota.component.html',
    standalone: true,
    imports: [MatTableModule, MatSortModule, DecimalPipe, DatePipe]
})
export class NotaComponent extends BaseComponent {
  displayedColumns = [
    "numero",
    "nome",
    "descricao",
    "created_at",
    "enviado_em",
    "valor",
    "status"
  ];

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
    this.model = 'notas';
  }
}
