import { Pessoa } from '../components/model/pessoa.model';
import { PessoaService } from '../components/service/pessoa.service';
import { Pipe, PipeTransform } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Pipe({
    name: 'pessoaId',
    standalone: true
})
export class PessoaIdPipe implements PipeTransform {
  constructor(private pessoaService: PessoaService) {}

  transform(value: string): string {
    let status: string = "";
    if (value) {
      // TODO: Implementar cache
      this.pessoaService.readById(value as unknown as number)
      .pipe(untilDestroyed(this))
      .subscribe((pessoa: Pessoa) => {
        status = pessoa.nome as string;
      });
      return status;
    } else {
      return value;
    }
  }
}
