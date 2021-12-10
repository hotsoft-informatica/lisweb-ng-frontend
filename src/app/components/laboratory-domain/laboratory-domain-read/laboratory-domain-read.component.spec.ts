import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryDomainReadComponent } from './laboratory-domain-read.component';

describe('LaboratoryDomainReadComponent', () => {
  let component: LaboratoryDomainReadComponent;
  let fixture: ComponentFixture<LaboratoryDomainReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryDomainReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryDomainReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
