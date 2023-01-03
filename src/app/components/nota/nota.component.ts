import { BaseComponent } from '../base/base.component';
import { Inject, Injector } from '@angular/core';

import {
  Component,
} from '@angular/core';
@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html'
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
