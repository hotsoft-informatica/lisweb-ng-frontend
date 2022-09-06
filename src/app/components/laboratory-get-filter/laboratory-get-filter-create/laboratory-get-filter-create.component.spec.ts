import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryGetFilterCreateComponent } from './laboratory-get-filter-create.component';

describe('LaboratoryGetFilterCreateComponent', () => {
  let component: LaboratoryGetFilterCreateComponent;
  let fixture: ComponentFixture<LaboratoryGetFilterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryGetFilterCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryGetFilterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
