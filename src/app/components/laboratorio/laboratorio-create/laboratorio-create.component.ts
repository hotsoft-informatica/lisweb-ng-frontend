import { Query } from '../../model/query.model';
import { LaboratoryDomain } from './../../model/laboratory-domain.model';
import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
import { Laboratorio } from '../../model/laboratorio.model';
import { Router } from '@angular/router';
import { LaboratorioService } from '../../service/laboratorio.service';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  debounceTime,
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-laboratorio-create',
    templateUrl: './laboratorio-create.component.html',
    standalone: true,
    imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, NgFor, MatOptionModule, MatDatepickerModule, MatButtonModule]
})
export class LaboratorioCreateComponent implements OnInit {
  laboratorio: Laboratorio;
  laboratoryDomains: LaboratoryDomain[] = [];
  subject: Subject<any> = new Subject();
  queries: Query[] = [];

  constructor(
    private router: Router,
    private laboratorioService: LaboratorioService,
    private laboratoryDomainService: LaboratoryDomainService
  ) {
    this.laboratorio = new Laboratorio({});
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subject.pipe(debounceTime(500)).subscribe(() => {
      this.laboratoryDomainService
        .find('id', 'asc', 0, 60, this.queries)
        .subscribe((laboratoryDomains: any) => {
          console.table(this.queries);
          this.laboratoryDomains = laboratoryDomains;
        });
    });
    this.subject.next(null);
  }

  search(): void {
    const query_string = this.laboratorio
      .laboratory_domain_id as unknown as string;
    const query = new Query({
      key: 'name',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subject.next(null);
  }

  createLaboratorio(): void {
    this.laboratorioService.create(this.laboratorio).subscribe(() => {
      this.laboratorioService.showMessage('Laboratório criado com sucesso!');
      this.router.navigate(['/laboratorios']).then(() => {
        window.location.reload();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/laboratorios']);
  }

  displayFn(options: LaboratoryDomain[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.name : '';
    };
  }
}

