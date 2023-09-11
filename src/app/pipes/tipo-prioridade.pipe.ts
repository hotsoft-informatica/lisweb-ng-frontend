import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tipoprioridade',
    standalone: true
})
export class TipoPrioridadePipe implements PipeTransform {
  transform(value: string): string {
    let status: string = "";
    if (value) {
      switch (value) {
        case "A": {
          status = "Atendimento";
          break;
        }
        case "C": {
          status = "Coleta";
          break;
        }
      }
      console.warn(status);
      return status;
    } else {
      console.warn(value);
      return value;
    }
  }
}
