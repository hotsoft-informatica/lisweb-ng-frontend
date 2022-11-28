import { MetodoExameService } from 'src/app/components/service/metodo-exame.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MetodoExame } from '../model/metodo-exame.model';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

export interface DialogData{
  metodoExame: MetodoExame;
}
@Component({
  selector: 'app-metodo-exame',
  templateUrl: './metodo-exame.component.html',
})

export class MetodoExameComponent implements OnInit {

@Input('metodoExame') metodoExame: MetodoExame;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private metodoExameService: MetodoExameService,
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

}
