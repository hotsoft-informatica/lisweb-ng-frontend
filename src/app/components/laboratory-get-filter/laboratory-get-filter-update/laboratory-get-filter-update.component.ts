import { ClientServerTable } from './../../model/client-server-table.model';
import { ClientServerTableService } from '../../service/client-server-table.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoryGetFilter } from '../../model/laboratory-get-filter.model';
import { LaboratoryGetFilterService } from '../../service/laboratory-get-filter.service';
import { Subject } from 'rxjs';
import { Query } from '../../model/query.model';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-laboratory-get-filter-update',
    templateUrl: './laboratory-get-filter-update.component.html',
    standalone: true,
    imports: [MatCardModule, NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, NgFor, MatOptionModule, TextFieldModule, MatButtonModule]
})
export class LaboratoryGetFilterUpdateComponent implements OnInit {
  laboratoryGetFilter!: LaboratoryGetFilter;
  clientServerTables: ClientServerTable[] = [];
  id: any;
  subject: Subject<any> = new Subject();
  queries: Query[] = [];

  constructor(
    private laboratoryGetFilterService: LaboratoryGetFilterService,
    private clientServerTableService: ClientServerTableService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.load(this.id);
    this.laboratoryGetFilter ||= new LaboratoryGetFilter({});
  }

  ngOnInit(): void { }

  load(id: number): void {
    this.laboratoryGetFilterService
      .readById(id as unknown as number)
      .subscribe((laboratoryGetFilter) => {
        this.laboratoryGetFilter = laboratoryGetFilter;
      });

    this.clientServerTableService.read().subscribe((clientServerTables) => {
      this.clientServerTables = clientServerTables;
    });
  }

  updateLaboratoryGetFilter(): void {
    this.laboratoryGetFilterService.update(this.laboratoryGetFilter).subscribe(() => {
      this.laboratoryGetFilterService.showMessage(
        'Filtro atualizado com sucesso!'
      );
    });
    this.router.navigate(['/laboratory_get_filters']).then(() => {
      window.location.reload();
    });
  }

  cancel(): void {
    this.router.navigate(['/laboratory_get_filters']);  }

  displayFn(options: LaboratoryGetFilter[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.name: '';
    };
  }

  search(): void {
    const query_string = this.laboratoryGetFilter.client_server_table_id as unknown as string;
    const query = new Query({
      key: 'client_name',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subject.next(null);
  }
}
