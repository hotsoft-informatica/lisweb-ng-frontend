import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'valorpadraocodigobarra',
    standalone: true
})
export class ValorPadraoCodigoBarraPipe implements PipeTransform {
  transform(value: number): any {
    let padraocodigobarra: string = "";
    if (value) {
      switch (value) {
        case 9 : {
          padraocodigobarra = "Codabar";
          break;
        }
        case 5 : {
          padraocodigobarra = "Code128";
          break;
        }
        case 2 : {
          padraocodigobarra = "EAN_13";
          break;
        }
        case 3 : {
          padraocodigobarra = "EAN_8";
          break;
        }
        case 8 : {
          padraocodigobarra = "FIM";
          break;
        }
        case 4 : {
          padraocodigobarra = "Int2of5";
          break;
        }
        case 10 : {
          padraocodigobarra = "MSI";
          break;
        }
        case 7 : {
          padraocodigobarra = "Postnet";
          break;
        }
        case 0 : {
          padraocodigobarra = "UPC_A";
          break;
        }
        case 1 : {
          padraocodigobarra = "UPC_E";
          break;
        }
      }
      console.warn(padraocodigobarra);
      return padraocodigobarra;
    } else {
      console.warn(value);
      return value;
    }
  }
}
