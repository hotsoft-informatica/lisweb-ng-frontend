import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryGetFilterReadComponent } from './laboratory-get-filter-read.component';

describe('LaboratoryGetFilterReadComponent', () => {
  let component: LaboratoryGetFilterReadComponent;
  let fixture: ComponentFixture<LaboratoryGetFilterReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryGetFilterReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryGetFilterReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
