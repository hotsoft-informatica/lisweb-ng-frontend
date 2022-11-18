import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marcacaotipo'
})
export class MarcacaoTipoPipe implements PipeTransform {
  transform(value: string): string {
    let status: string = "";
    if (value) {
      switch (value) {
        case "D": {
          status = "Dias";
          break;
        }
        case "M": {
          status = "Meses";
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
