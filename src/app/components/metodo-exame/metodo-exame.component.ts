import { MetodoExameService } from 'src/app/components/service/metodo-exame.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MetodoExame } from '../model/metodo-exame.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  metodoExame: MetodoExame;
}
@Component({
  selector: 'app-metodo-exame',
  templateUrl: './metodo-exame.component.html',
  styleUrls: ['./metodo-exame.component.css']
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
    console.table(this.metodoExame);
    this.metodoExameService.create(this.metodoExame).subscribe(() => {

    });
  }

  ngOnInit(): void {
  }

}
