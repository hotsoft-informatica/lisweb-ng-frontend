import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryDomainCrudComponent } from './laboratory-domain-crud.component';

describe('LaboratoryDomainCrudComponent', () => {
  let component: LaboratoryDomainCrudComponent;
  let fixture: ComponentFixture<LaboratoryDomainCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryDomainCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryDomainCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
