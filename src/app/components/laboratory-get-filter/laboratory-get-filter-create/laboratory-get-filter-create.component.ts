import { Query } from '../../model/query.model';
import { Router } from '@angular/router';
import { LaboratoryGetFilterService } from '../../service/laboratory-get-filter.service';
import { ClientServerTableService } from '../../service/client-server-table.service';
import {
  AfterViewInit,
  ElementRef,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  filter,
} from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { Subject } from 'rxjs';
import { LaboratoryGetFilter } from '../../model/laboratory-get-filter.model';
import { ClientServerTable } from '../../model/client-server-table.model';

@Component({
  selector: 'app-laboratory-get-filter-create',
  templateUrl: './laboratory-get-filter-create.component.html',
  styleUrls: ['./laboratory-get-filter-create.component.css'],
})
export class LaboratoryGetFilterCreateComponent implements OnInit {
  laboratory_get_filter: LaboratoryGetFilter;
  clientServerTables: ClientServerTable[] = [];
  subject: Subject<any> = new Subject();
  queries: Query[] = [];

  constructor(
    private router: Router,
    private laboratoryGetFilterService: LaboratoryGetFilterService,
    private clientServerTableService: ClientServerTableService
  ) {
    this.laboratory_get_filter = new LaboratoryGetFilter({});
  }

  ngOnInit(): void {
    const query = new Query({ key: '', value: '', isNumeric: false });

    this.subject.pipe(debounceTime(500)).subscribe(() => {
      this.clientServerTableService.findClientServerTables('client_name', 'asc', 0, 60, this.queries).subscribe((clientServerTables) => {
          console.table(this.queries);
          this.clientServerTables = clientServerTables;
        });
    });
    this.subject.next(null);
  }

  createLaboratoryGetFilter(): void {
    this.laboratoryGetFilterService.create(this.laboratory_get_filter).subscribe(() => {
      this.laboratoryGetFilterService.showMessage('Filtro de GET do Híbrido criado com sucesso!');
      this.router.navigate(['/laboratory_get_filters']).then(() => {
        window.location.reload();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/laboratory_get_filters']);
  }

  search(): void {
    const query_string = this.laboratory_get_filter.client_server_table_id as unknown as string;
    const query = new Query({
      key: 'client_name',
      value: query_string,
      isNumeric: false,
    });
    this.queries = [];
    this.queries.push(query);
    this.subject.next(null);
  }

  displayFn(options: LaboratoryGetFilter[]): (id: any) => any {
    return (id: any) => {
      const correspondingOption = Array.isArray(options)
        ? options.find((option) => option.id === id)
        : null;
      return correspondingOption ? correspondingOption.name: '';
    };
  }
}
