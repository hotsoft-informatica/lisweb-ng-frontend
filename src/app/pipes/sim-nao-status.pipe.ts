import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'simnaostatus',
    standalone: true
})
export class ValorSimNaoStatusPipe implements PipeTransform {
  transform(value: string): string {
    let status: string = "";
    if (value) {
      switch (value) {
        case "S": {
          status = "Sim";
          break;
        }
        case "N": {
          status = "Não";
          break;
        }
      }
      return status;
    } else {
      return value;
    }
  }
}
