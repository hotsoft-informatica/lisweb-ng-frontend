import { Pipe, PipeTransform } from '@angular/core';
import { PessoaService } from '../components/service/pessoa.service';
import { Pessoa } from '../components/model/pessoa.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
@Pipe({
  name: 'pessoaId'
})
export class PessoaIdPipe implements PipeTransform {
  constructor(private pessoaService: PessoaService) {}

  transform(value: string): string {
    let status: string = "";
    if (value) {
      // TODO: Implementar cache
      this.pessoaService.readById(value as unknown as number).subscribe((pessoa: Pessoa) => {
        status = pessoa.nome as string;
      });
      return status;
    } else {
      return value;
    }
  }
}
