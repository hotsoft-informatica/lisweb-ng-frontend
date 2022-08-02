import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valorreferenciasexo'
})
export class ValorReferenciaSexoPipe implements PipeTransform {
  transform(value: string): string {
    let sexo: string = "";
    if (value) {
      switch (value) {
        case "M": {
          sexo = "Masculino";
          break;
        }
        case "F": {
          sexo = "Feminino";
          break;
        }
        case "A": {
          sexo = "Ambos";
          break;
        }
      }
      console.warn(sexo);
      return sexo;
    } else {
      console.warn(value);
      return value;
    }
  }
}
