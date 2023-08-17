import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'valorModoUso',
    standalone: true
})
export class ValorModoUsoPipe implements PipeTransform {
  transform(value: string): string {
    let modoUso: string = "";
    if (value) {
      switch (value) {
        case "M": {
          modoUso = "Meio de Coleta";
          break;
        }
        case "C": {
          modoUso = "Consumo";
          break;
        }
        case "R": {
          modoUso = "Reagente";
          break;
        }
        case "E": {
          modoUso = "Expediente";
          break;
        }
      }
      console.warn(modoUso);
      return modoUso;
    } else {
      console.warn(value);
      return value;
    }
  }
}
