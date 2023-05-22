import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetodoExame } from '../model/metodo-exame.model';
import { MetodoExameService } from 'src/app/components/service/metodo-exame.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

export interface DialogData {
  metodoExame: MetodoExame;
}
@Component({
  selector: 'app-metodo-exame',
  templateUrl: './metodo-exame.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule]
})

export class MetodoExameComponent implements OnInit {

  @Input('metodoExame') metodoExame: MetodoExame;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private metodoExameService: MetodoExameService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.metodoExame = this.data.metodoExame;
    this.metodoExame ||= new MetodoExame({});
  }
  createMetodoExame(): void {
    this.metodoExameService.create(this.metodoExame).subscribe(() => {

    });
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['/metodos-exames/read']);
  }
}
