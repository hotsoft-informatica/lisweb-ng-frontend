import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'versaoexamestatus',
    standalone: true
})
export class VersaoExameStatusPipe implements PipeTransform {
  transform(value: string): string {
    let status: string = "";
    if (value) {
      switch (value) {
        case "I": {
          status = "Inativo";
          break;
        }
        case "A": {
          status = "Ativo";
          break;
        }
      }
      return status;
    } else {
      return value;
    }
  }
}
