import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryDomainDeleteComponent } from './laboratory-domain-delete.component';

describe('LaboratoryDomainDeleteComponent', () => {
  let component: LaboratoryDomainDeleteComponent;
  let fixture: ComponentFixture<LaboratoryDomainDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryDomainDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryDomainDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
