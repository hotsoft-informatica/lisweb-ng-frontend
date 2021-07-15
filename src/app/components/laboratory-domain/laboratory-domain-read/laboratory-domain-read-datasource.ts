import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface LaboratoryDomainReadItem {
  id: number;
  name: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: LaboratoryDomainReadItem[] = [
  { id: 1, name: 'Hydrogen', },
  { id: 2, name: 'Helium' },
  { id: 3, name: 'Lithium' },
  { id: 4, name: 'Beryllium' },
  { id: 5, name: 'Boron' },
  { id: 6, name: 'Carbon' },
  { id: 7, name: 'Nitrogen' },
  { id: 8, name: 'Oxygen' },
  { id: 9, name: 'Fluorine' },
  { id: 10, name: 'Neon' },
  { id: 11, name: 'Sodium' },
  { id: 12, name: 'Magnesium' },
  { id: 13, name: 'Aluminum' },
  { id: 14, name: 'Silicon' },
  { id: 15, name: 'Phosphorus' },
  { id: 16, name: 'Sulfur' },
  { id: 17, name: 'Chlorine' },
  { id: 18, name: 'Argon' },
  { id: 19, name: 'Potassium' },
  { id: 20, name: 'Calcium' },
];

export class LaboratoryDomainReadItemReadDataSource extends DataSource<LaboratoryDomainReadItem> {
  data: LaboratoryDomainReadItem[] = EXAMPLE_DATA;

  constructor() {
    super();
  }

  connect(): Observable<LaboratoryDomainReadItem[]> {
    const dataMutations = [observableOf(this.data)];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.data;
      })
    );
  }

  disconnect() { }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
