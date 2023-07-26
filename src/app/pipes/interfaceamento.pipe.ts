import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'valorinterfaceamento',
    standalone: true
})
export class ValorInterfaceamentoPipe implements PipeTransform {
  transform(value: string): string {
    let interfaceamento: string = "";
    if (value) {
      switch (value) {
        case "H": {
          interfaceamento = "Hotsoft";
          break;
        }
        case "M": {
          interfaceamento = "Matrix";
          break;
        }
      }
      console.warn(interfaceamento);
      return interfaceamento;
    } else {
      console.warn(value);
      return value;
    }
  }
}
