import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryDomainUpdateComponent } from './laboratory-domain-update.component';

describe('LaboratoryDomainUpdateComponent', () => {
  let component: LaboratoryDomainUpdateComponent;
  let fixture: ComponentFixture<LaboratoryDomainUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryDomainUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryDomainUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
