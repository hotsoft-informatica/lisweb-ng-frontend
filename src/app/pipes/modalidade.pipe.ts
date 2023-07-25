import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'valormodalidade',
    standalone: true
})
export class ValorModalidadePipe implements PipeTransform {
  transform(value: string): string {
    let modalidade: string = "";
    if (value) {
      switch (value) {
        case "A": {
          modalidade = "Análise";
          break;
        }
        case "E": {
          modalidade = "Etiquetagem";
          break;
        }
        case "S": {
          modalidade = "Sorter";
          break;
        }
      }
      console.warn(modalidade);
      return modalidade;
    } else {
      console.warn(value);
      return value;
    }
  }
}
