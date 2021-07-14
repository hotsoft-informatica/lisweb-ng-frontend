import { LaboratoryDomain } from './../laboratory-domain.model';
import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: LaboratoryDomain[] = [
  { id: 1, name: 'Hydrogen' },
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

export class LaboratoryDomainReadDataSource extends DataSource<LaboratoryDomain> {
  data: LaboratoryDomain[] = ([] = EXAMPLE_DATA);

  constructor() {
    super();
  }

  connect(): Observable<LaboratoryDomain[]> {
    const dataMutations = [observableOf(this.data)];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.data;
      })
    );
  }

  disconnect() { }
}
