import { TestBed } from '@angular/core/testing';

import { LaboratoryDomainService } from '../service/laboratory-domain.service';

describe('LaboratoryDomainService', () => {
  let service: LaboratoryDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratoryDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
