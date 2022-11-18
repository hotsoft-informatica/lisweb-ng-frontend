import { Paciente } from 'src/app/components/model/paciente.model';
import { PacienteService } from 'src/app/components/service/paciente.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import * as moment from 'moment';


@Component({
  selector: 'app-paciente-show',
  templateUrl: './paciente-show.component.html',
  styleUrls: ['./paciente-show.component.css']
})
export class PacienteShowComponent implements OnChanges {
  paciente: Paciente;
  id: number;
  @Input() pacienteInput: any;

  constructor(
    private router: Router, // router
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    ){
      this.paciente = new Paciente(); // alternativa memory leak //Dont repeat yourself DRY

      this.id = this.route.snapshot.paramMap.get('id') as unknown as number; // abertura por id
      if (this.id > 0) {
        this.load(this.id); // id > 0 carrega o paciente
      }
    }


  ngOnChanges(): void {
    this.id = this.pacienteInput;
    if (this.id > 0){
      this.load(this.id);
    }
  }

  load(id: number): void { // Dont repeat yourself DRY //abertura por id
    this.pacienteService
      .readById(id)

      .subscribe((paciente) => {
        this.paciente = paciente;
      });
  }

  public calculaIdade(): void{
    // TO-DO REVER
  //   const tempo = moment(this.paciente.data_nascimento); // converte data
  //   const diff = moment.duration(moment().diff(tempo)); // calcula diferença da data nascimento para data atual
  //   this.paciente.idade_paciente = diff.years() + ' anos, '
  //                                + diff.months() + ' meses, '
  //                                + diff.days() + ' dias.'; // apresenta valor por diff
   }
}
